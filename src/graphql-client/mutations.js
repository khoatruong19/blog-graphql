import { gql } from "@apollo/client";

const addNewPost = gql`
    mutation addNewPost($title: String, $content: String, $authorId: ID!){
        createNewPost(title: $title, content:$content, authorId: $authorId) {
            id 
            title
            content
        }
    }
`


const deleteSinglePost = gql`
    mutation deletePostMutation($id:String){
        deletePost(id: $id)
    }
`

const addNewAuthor = gql`
    mutation addNewAuthor($_id: String, $username: String, $imageUrl: String){
        createNewAuthor(_id: $_id,username: $username, imageUrl: $imageUrl){
            id
            username
        }
    }
`

const addNewComment = gql`
    mutation addNewComment($comment: String, $postId: ID!, $authorId: String!){
        createNewComment(comment: $comment, postId: $postId, authorId: $authorId){
            id
        }
    }
`

const deleteSingleComment = gql`
    mutation deleteCommentMutation($id:String){
        deleteComment(id: $id)
    }
`

const handleLikeUnlike = gql`
    mutation likeUnlikeMutation($postId: ID!, $authorId: String!){
        handleLike(postId : $postId, authorId: $authorId)
    }
`

export {addNewPost, deleteSinglePost ,addNewAuthor,addNewComment, deleteSingleComment, handleLikeUnlike}