import type { Core } from "@strapi/strapi";

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * Bootstrap: registra o cron job que atualiza automaticamente
   * o estado dos jogos com base no horário programado.
   *
   * Regras:
   *  - proximo  → em_andamento  quando  data_hora <= agora
   *  - em_andamento → finalizado quando  data_hora + 3h <= agora
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Executa a cada 5 minutos
    strapi.cron.add({
      atualizarEstadoJogos: {
        task: async () => {
          try {
            const agora = new Date();

            // 1) proximo → em_andamento (horário do jogo já chegou)
            const jogosParaIniciar = await strapi.documents("api::jogo.jogo").findMany({
              filters: {
                estado: "proximo",
                data_hora: { $lte: agora.toISOString() },
              },
            });

            for (const jogo of jogosParaIniciar) {
              await strapi.documents("api::jogo.jogo").update({
                documentId: jogo.documentId,
                data: { estado: "em_andamento" } as any,
              });
              strapi.log.info(`[Cron] Jogo ${jogo.documentId} → em_andamento`);
            }

            // 2) em_andamento → finalizado (passou 3h do início)
            const tresHorasAtras = new Date(agora.getTime() - 3 * 60 * 60 * 1000);

            const jogosParaFinalizar = await strapi.documents("api::jogo.jogo").findMany({
              filters: {
                estado: "em_andamento",
                data_hora: { $lte: tresHorasAtras.toISOString() },
              },
            });

            for (const jogo of jogosParaFinalizar) {
              await strapi.documents("api::jogo.jogo").update({
                documentId: jogo.documentId,
                data: { estado: "finalizado" } as any,
              });
              strapi.log.info(`[Cron] Jogo ${jogo.documentId} → finalizado`);
            }

            if (jogosParaIniciar.length > 0 || jogosParaFinalizar.length > 0) {
              strapi.log.info(
                `[Cron] Atualização concluída: ${jogosParaIniciar.length} iniciados, ${jogosParaFinalizar.length} finalizados`
              );
            }
          } catch (err) {
            strapi.log.error("[Cron] Erro ao atualizar estado dos jogos:", err);
          }
        },
        options: {
          rule: "*/5 * * * *", // a cada 5 minutos
        },
      },
    });

    strapi.log.info("[Bootstrap] Cron de atualização de jogos registrado (a cada 5 min)");
  },
};
