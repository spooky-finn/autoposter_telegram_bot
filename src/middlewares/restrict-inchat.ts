import { MyContext } from '../types'

export const restrictInChat = (
    ctx: MyContext,
    next: () => Promise<void>,
): Promise<void> => {
    let isPrivateChat = false

    if (ctx.message) {
        isPrivateChat = ctx.message.chat.type === 'private' ? true : false
    } else if (ctx.callbackQuery) {
        isPrivateChat =
            ctx.callbackQuery?.message?.chat.type === 'private' ? true : false
    } else {
        console.error('Can not recognize chat type into middleware')
    }

    if (isPrivateChat) return next()
    else return
}
