import { CancelHandler } from '../../../core/application/http/cancel-handler/cancel-handler'
import { HttpHandler } from '../../../core/application/http/http-handler'
import { Post } from '../../application/types/post'
import { PostRepository } from '../../application/repositories/post-repository'

export const getPostsRepositoryJSONPlaceHolder = (
    http: HttpHandler,
    cancelHandler: CancelHandler,
): PostRepository => {
    const getAll = async (): Promise<Post[]> => {
        const { job, cancel } = http.get<unknown, Post[]>({
            url: '/danixl30/db-jsonplaceholder/posts',
        })
        cancelHandler.subscribeCancel(cancel)
        const res = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return res.body
    }

    return {
        getAll,
    }
}
