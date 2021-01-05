import {getAllProducts, findProductById} from "../../libraries/database-admin";
import {Box, Button, FormControl, FormLabel, Textarea, useToast} from "@chakra-ui/react"
import {useForm} from "react-hook-form";
import {useAuth} from "../../libraries/auth";
import {useRouter} from "next/router";
import {GetStaticPaths, GetStaticProps} from "next";
import {FcGoogle} from 'react-icons/fc'

const Comment = () => {
    const auth = useAuth()
    const router = useRouter()
    const {register, handleSubmit} = useForm();
    const toast = useToast()

    const {productId, backgroundColor, buttonColor, fontColor} = router.query

    let BACKGROUND_COLOR: string
    backgroundColor === 'gray' ? BACKGROUND_COLOR = 'gray.100' : BACKGROUND_COLOR = backgroundColor?.toString() || 'white'
    const BUTTON_COLOR = buttonColor?.toString() || 'teal'
    const FONT_COLOR = fontColor?.toString() || 'gray.900'

    const addComment = async (feedback) => {
        const newFeedback = {
            author: auth.user.displayName,
            authorId: auth.user.uid,
            ...feedback,
            createdAt: new Date().toISOString(),
            status: 'active'
        }

        const response = await fetch(`/api/feedback/new/${productId}`, {
            method: "POST",
            body: JSON.stringify(newFeedback)
        });

        if (response.status === 200) {
            toast({
                title: "Seu comentário foi enviado!",
                description: "Já estamos cientes da sua opinião, obrigado pela avaliação.",
                status: "success",
                duration: 7000,
                isClosable: true,
            })
        }

        // @ts-ignore
        document.getElementById('comment').value = ''
    }

    return (
        <>
            <Box as={`form`} onSubmit={handleSubmit(addComment)} width={`100%`}
                 marginBottom={5} backgroundColor={`${BACKGROUND_COLOR}`} color={`${FONT_COLOR}`}>
                <FormControl marginTop={5}>
                    <FormLabel htmlFor={`comment`}>Deixe o seu comentário</FormLabel>
                    <Textarea
                        id={`comment`}
                        name={`comment`}
                        ref={register({required: 'Required'})}
                        placeholder={`Sugestão, elogio ou reclamação...`}/>
                </FormControl>
                {auth.user &&
                <Button colorScheme={`${BUTTON_COLOR}`} marginTop={2} type={`submit`}>
                    Enviar comentário
                </Button>
                }
                {
                    !auth.user &&
                    <Button variant="outline" size={`md`} fontWeight={`medium`}
                            colorScheme={"#000"}
                            onClick={auth.signInWithGoogle}
                            marginTop={2}
                    >
                        <Box as={FcGoogle} size={24} marginRight={2}/>
                        Entre com sua conta Google
                    </Button>
                }
            </Box>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {productId} = context.params
    const {product} = await findProductById(productId.toString())

    return {
        props: {
            product
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

export default Comment
