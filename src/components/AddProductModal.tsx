import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Button, Textarea, Select, useToast
} from "@chakra-ui/react"
import {useRef} from "react";
import {useForm} from 'react-hook-form'
import Product from "../interfaces/Product";
import {createProduct} from "../libraries/database";
import {useAuth} from "../libraries/auth";
import useSWR, {mutate} from 'swr'
import fetcher from "../utilitaries/fetcher";

const AddProductModal = ({isFirstProduct}) => {
    const auth = useAuth()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()
    const initialRef = useRef()
    const {register, handleSubmit} = useForm();
    const {data} = useSWR('/api/products', fetcher)

    const addProduct = async (product: Product) => {
        const newProduct = {
            owner: auth.user.uid,
            createdAt: new Date().toISOString(),
            ...product
        }

        await createProduct(newProduct)
        onClose()

        toast({
            title: "Produto registrado!",
            description: "Seu produto foi registrado e já pode receber feedbacks.",
            status: "success",
            duration: 7000,
            isClosable: true,
        })

        mutate(
            auth.user ? ['/api/products', auth.user.ya] : null,
            async (data: any) => {
                return {products: [...data.products, newProduct]}
            },
            false
        )
    }


    return (
        <div>
            <Button variant={`solid`} size={`md`} onClick={onOpen} colorScheme={`teal`} fontWeight={`medium`}>
                {
                    isFirstProduct ? 'Adicione seu primeiro produto' : '+ Adicionar Produto'
                }
            </Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent as={`form`} onSubmit={handleSubmit(addProduct)}>
                    <ModalHeader fontWeight={`bold`}>Adicionar produto</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody paddingBottom={6}>
                        <FormControl>
                            <FormLabel>Nome do produto</FormLabel>
                            <Input name={`name`} ref={register({required: 'Required'})}
                                   placeholder="Qual é o nome do seu produto?"/>
                        </FormControl>

                        <FormControl marginTop={4}>
                            <FormLabel>Descrição</FormLabel>
                            <Textarea name={`description`} ref={register({required: 'Required'})}
                                      placeholder="Descreva brevemente seu produto..."/>
                        </FormControl>

                        <FormControl marginTop={4}>
                            <FormLabel>Qual é a categoria do produto?</FormLabel>
                            <Select name={`category`} ref={register({required: 'Required'})}>
                                <option value={`company`}>Empresa</option>
                                <option value={`brand`}>Marca</option>
                                <option value={`services-provision`}>Prestação de serviços</option>
                                <option value={`digital-product`}>Produto digital</option>
                                <option value={`physical-product`}>Produto físico</option>
                                <option value={`site-or-blog`}>Site ou blog</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} marginRight={3}>Cancelar</Button>
                        <Button colorScheme={`teal`} type={`submit`}>
                            Adicionar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AddProductModal