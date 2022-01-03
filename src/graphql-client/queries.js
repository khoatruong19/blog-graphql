import {gql} from "@apollo/client"

const getSinglePost = gql`
    query getPostQuery($id: ID!){
        post(id:$id){
            id
            title
            content
            author{
                id
                username
            }
        }
    }
`

const getPosts = gql`
    query getPostsQuery{
        posts{
            id
            title
            content
            author{
                id
                username
            }
        }
    }
`

const getComments = gql`
    query getCommentsQuery($postId: ID!){
        comments(postId:$postId){
            id
            comment
            author{
                id
                username
            }
        }
    }
`

const getLikes = gql`
    query getLikesQuery($postId: ID!){
        likes(postId:$postId){
            postId
            authorId
        }
    }
`

const checkLiked = gql`
query checkLikeQuery($postId: ID!, $authorId: String!){
   checkLike(authorId: $authorId, postId: $postId)
}
`

export {getPosts, getSinglePost, getComments, getLikes, checkLiked}