import {getAllFeedback, getAllProducts, findProductById} from "../../libraries/database-admin";
import Feedback from "../../components/Feedback"
import {
    Box,
    Button,
    Divider,
    FormHelperText,
    FormControl,
    FormLabel,
    Heading,
    Text,
    Textarea,
    useToast,
    Link
} from "@chakra-ui/react"
import {useForm} from "react-hook-form";
import {useAuth} from "../../libraries/auth";
import {useState} from "react";
import {useRouter} from "next/router";
import {GetStaticPaths, GetStaticProps} from "next";
import {FcGoogle} from 'react-icons/fc'

const ProductFeedback = ({initialFeedback, product}) => {
    const auth = useAuth()
    const router = useRouter()
    const {register, handleSubmit} = useForm();
    const [allFeedback, setAllFeedback] = useState(initialFeedback)
    const toast = useToast()

    const {productId} = router.query

    const addComment = async (feedback) => {
        const newFeedback = {
            author: auth.user.displayName || auth.user.name,
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

        setAllFeedback([{author: auth.user.displayName, ...newFeedback}, ...allFeedback])
    }

    return (
        <Box alignItems={`center`} display={`flex`} flexDirection={`column`} margin={`0 auto`}
             minHeight={`100vh`} backgroundColor={`gray.50`} paddingY={10}>

            <Box width={[`98vw`, `75vw`, `60vw`, `50vw`]} display={`flex`} flexDirection={`column`}>
                <Heading size={`md`} color={`teal.900`} marginBottom={3}>{product?.name}</Heading>
                <Text fontWeight={`medium`} color={`teal.800`} marginBottom={3}>{product?.description}</Text>
                <Divider color={`gray.200`}/>
            </Box>


            <Box as={`form`} onSubmit={handleSubmit(addComment)} width={[`98vw`, `75vw`, `60vw`, `50vw`]}
                 marginBottom={10}>
                <FormControl marginTop={5}>
                    <FormLabel htmlFor={`comment`} color={`teal.900`}>Deixe o seu comentário</FormLabel>
                    <Textarea
                        id={`comment`}
                        name={`comment`}
                        ref={register({required: 'Required'})}
                        placeholder={`Sugestão, elogio ou reclamação...`}/>
                    <FormHelperText fontSize={10}>
                        <Link isExternal href={'/'} display={`flex`}>
                            Criado e mantido por &nbsp;<Text fontWeight={`medium`}>Avalia Aí</Text>
                        </Link>
                    </FormHelperText>
                </FormControl>
                {
                    auth.user &&
                    <Button colorScheme={`teal`} marginTop={2} type={`submit`}>Enviar
                        comentário</Button>
                }
                {
                    !auth.user &&
                    <Button variant="outline" size={`md`} fontWeight={`medium`}
                            colorScheme={"#000"}
                            onClick={auth.signInWithGoogle}
                            marginTop={2}>
                        <Box as={FcGoogle} size={24} marginRight={2}/>
                        Entre com sua conta Google
                    </Button>
                }
            </Box>

            {
                allFeedback?.length < 1 && (
                    <>
                        <Heading size={`md`} color={`teal.900`} fontWeight={`bold`} marginTop={10}>Não foi encontrado
                            nenhum
                            comentário sobre {product?.name}</Heading>
                        <Heading size={`sm`} color={`teal.900`} fontWeight={`bold`} marginTop={4}>Seja o primeiro a
                            avaliar!</Heading>
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
    const {product} = await findProductById(productId.toString())

    return {
        props: {
            initialFeedback: feedback,
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

export default ProductFeedback
