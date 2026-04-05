import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import landingPage from './landingPage'
import patientJourneysModule from './patientJourneysModule'
import heroModule from './heroModule'
import logoModule from './logoModule'
import centeredModule from './centeredModule'
import contactModule from './contactModule'
import clientLogo from './clientLogo'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, landingPage, patientJourneysModule, heroModule, logoModule, centeredModule, contactModule, clientLogo],
}
