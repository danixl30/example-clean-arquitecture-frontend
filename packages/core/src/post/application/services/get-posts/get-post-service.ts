import { GetPostApplicatoinService } from './type/GetPostApplicationService'
import { PostRepository } from '../../repositories/post-repository'

export const getPostService = (
    postRepository: PostRepository,
): GetPostApplicatoinService => {
    const execute = (_?: unknown) => {
        return postRepository.getAll()
    }

    return {
        execute,
    }
}
