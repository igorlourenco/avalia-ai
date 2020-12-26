import {GetStaticPaths, GetStaticProps} from "next";
import {getAllFeedback, getAllProducts} from "../../libraries/database-admin";
import Feedback from "../../components/Feedback"
import {Box, Button, FormControl, FormLabel, Textarea} from "@chakra-ui/react"
import {useForm} from "react-hook-form";
import {useAuth} from "../../libraries/auth";
import {useRouter} from "next/router";
import {createFeedback} from "../../libraries/database";
import {useState} from "react";

const ProductFeedback = ({initialFeedback}) => {
    const auth = useAuth()
    const router = useRouter()
    const {register, handleSubmit} = useForm();
    const [allFeedback, setAllFeedback] = useState(initialFeedback)

    const {productId} = router.query

    const addComment = async (feedback) => {
        const newFeedback = {
            author: auth.user.displayName,
            authorId: auth.user.uid,
            provider: auth.user.providerData[0].providerId,
            productId,
            rating: 'temp',
            ...feedback,
            createdAt: new Date().toISOString(),
            status: 'pending'
        }

        await createFeedback(newFeedback)
        setAllFeedback([newFeedback, ...allFeedback])
    }

    return (
        <Box display={`flex`} flexDirection={`column`} width={`full`} maxWidth={`700px`} margin={`0 auto`}>
            <form onSubmit={handleSubmit(addComment)}>
                <FormControl marginY={5}>
                    <FormLabel htmlFor={`comment`}>Comentário</FormLabel>
                    <Textarea
                        id={`comment`}
                        name={`comment`}
                        ref={register({required: 'Required'})}
                        placeholder={`Deixe sua sugestão, elogio ou reclamação...`}/>
                    {auth.user && <Button colorScheme={`teal`} marginTop={2} type={`submit`}>Enviar comentário</Button>}
                </FormControl>
            </form>

            {
                !auth.user &&
                <Button variant={`ghost`} size={`md`} onClick={(e) => auth.signInWithGithub()} margin={3}>Entrar com Github</Button>
            }

            {
                allFeedback.map((feedback, index) => (
                    <Feedback key={index} author={feedback.author} text={feedback.text} createdAt={feedback.createdAt}/>
                ))
            }
        </Box>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {productId} = context.params
    const feedback = await getAllFeedback(productId.toString())

    return {
        props: {
            initialFeedback: feedback,
        },
        revalidate: 1
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await getAllProducts()
    const paths = products.map(product => ({
        params: {productId: product.id}
    }))

    return {
        paths,
        fallback: false,
    }
}

export default ProductFeedback