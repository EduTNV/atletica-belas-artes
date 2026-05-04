// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    console.log("🛠️ Iniciando limpeza de configurações do painel...");
    try {
      const entries = await strapi.db.query("strapi::core-store").findMany({
        where: {
          key: {
            $contains: "config-ajuda"
          }
        }
      });
      for (const entry of entries) {
        await strapi.db.query("strapi::core-store").delete({ where: { id: entry.id } });
        console.log(`   - Removida chave: ${entry.key}`);
      }
      console.log("✅ Reset total de visualização concluído.");
    } catch (error) {
      console.error("❌ Falha no reset total:", error.message);
    }
  },
};
