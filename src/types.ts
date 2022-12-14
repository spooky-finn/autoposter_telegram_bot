import { Context, Scenes } from 'telegraf'
import { User } from 'telegraf/typings/core/types/typegram'
import { WizardSessionData } from 'telegraf/typings/scenes'
import Chat from './chat'
import { Auto_Poster_Bot_Payment } from './generated/graphql'
import Post from './post'

// /**
//  * It is possible to extend the session object that is available to each wizard.
//  * This can be done by extending `WizardSessionData` and in turn passing your
//  * own interface as a type variable to `WizardSession` and to
//  * `WizardContextWizard`.
//  */
// interface MyWizardSession extends Scenes.WizardSessionData {
//     // will be available under `ctx.scene.session.myWizardSessionProp`
//     // myWizardSessionProp: number
//     advertising_days: number
//     chat: Chat
//     post_photo: string
//     post_text: string
//     post_keyboard: string

//     registered_post: Post
// }

/**
 * We can still extend the regular session object that we can use on the
 * context. However, as we're using wizards, we have to make it extend
 * `WizardSession`.
 *
 * It is possible to pass a type variable to `WizardSession` if you also want to
 * extend the wizard session as we do above.
 */
interface MySession extends Scenes.WizardSession<WizardSessionData> {
    // will be available under `ctx.session.mySessionProp`
    // mySessionProp: number
    user: AppUser
    post: {
        advertising_days?: number
        chat?: Chat
        post_photo?: string
        post_text?: string
        post_keyboard?: string

        registered_post?: Post
    }
}

/**
 * Now that we have our session object, we can define our own context object.
 *
 * As always, if we also want to use our own session object, we have to set it
 * here under the `session` property. In addition, we now also have to set the
 * scene object under the `scene` property. As we extend the scene session, we
 * need to pass the type in as a type variable once again.
 *
 * We also have to set the wizard object under the `wizard` property.
 */
export interface MyContext extends Context {
    // will be available under `ctx.myContextProp`
    // myContextProp: string

    // declare session type
    session: MySession
    // declare scene type
    scene: Scenes.SceneContextScene<MyContext, WizardSessionData>
    // declare wizard type
    // wizard: Scenes.WizardContextWizard<MyContext>
}

export interface AppUser extends User {
    balance: number
    chat_id: number
    status_id: number
}

export type Payment = Auto_Poster_Bot_Payment
