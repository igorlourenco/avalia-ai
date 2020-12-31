import {getAllFeedback, getAllProducts} from "../../../libraries/database-admin";
import Feedback from "../../../components/Feedback"
import {Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Text, Textarea} from "@chakra-ui/react"
import {useForm} from "react-hook-form";
import {useAuth} from "../../../libraries/auth";
import {createFeedback} from "../../../libraries/database";
import {useState} from "react";
import {useRouter} from "next/router";
import {GetStaticPaths, GetStaticProps} from "next";
import {FcGoogle} from 'react-icons/fc'

const EmbedProductFeedback = ({initialFeedback}) => {
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
            rating: 5,
            ...feedback,
            createdAt: new Date().toISOString(),
            status: 'active'
        }

        await createFeedback(newFeedback)

        // @ts-ignore
        document.getElementById('comment').value = ''

        setAllFeedback([newFeedback, ...allFeedback])
    }

    return (
        <Box alignItems={`center`} display={`flex`} flexDirection={`column`} margin={`0 auto`} backgroundColor={`gray.50`} paddingY={10}>
            <Box as={`form`} onSubmit={handleSubmit(addComment)} width={[`98vw`, `75vw`, `60vw`, `50vw`]} marginBottom={5}>
                <FormControl marginY={5}>
                    <FormLabel htmlFor={`comment`} color={`teal.900`}>Deixe o seu comentário</FormLabel>
                    <Textarea
                        id={`comment`}
                        name={`comment`}
                        ref={register({required: 'Required'})}
                        placeholder={`Sugestão, elogio ou reclamação...`}/>
                    {auth.user && <Button isDisable={router.isFallback} colorScheme={`teal`} marginTop={2} type={`submit`}>Enviar comentário</Button>}
                </FormControl>
            </Box>

            {
                !auth.user &&
                <Button variant="outline" size={`md`} fontWeight={`medium`}
                        colorScheme={"#000"}
                        onClick={auth.signInWithGoogle}
                        margin={3}>
                    <Box as={FcGoogle} size={24} marginRight={2}/>
                    Entre com Google
                </Button>
            }

            {
                allFeedback?.length < 1 && (
                    <>
                        <Heading size={`md`} color={`teal.900`} fontWeight={`bold`} marginTop={8}>Não foi encontrado nenhum
                            comentário.</Heading>
                        <Heading size={`sm`} color={`teal.900`} fontWeight={`bold`} marginTop={4}>Seja o primeiro a avaliar!</Heading>
                    </>
                )
            }

            {
                allFeedback?.map((feedback, index) => (
                    <Feedback key={index} {...feedback}/>
                ))
            }
        </Box>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {productId} = context.params
    const {feedback} = await getAllFeedback(productId.toString())

    return {
        props: {
            initialFeedback: feedback,
        },
        revalidate: 1
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const {products} = await getAllProducts()
    const paths = products.map(product => ({
        params: {productId: product.id}
    }))

    return {
        paths,
        fallback: true,
    }
}

export default EmbedProductFeedback
