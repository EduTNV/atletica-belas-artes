import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '6zhlnbqu',
    dataset: 'production'
  },
  deployment: {
    appId: 'nnc7embc1snyhx49pb9xs5dr',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
