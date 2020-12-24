import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Button, Textarea, Select
} from "@chakra-ui/react"
import {useRef} from "react";
import {useForm} from 'react-hook-form'
import Product from "../interfaces/Product";
import {createProduct} from "../libraries/database";
import {useAuth} from "../libraries/auth";

const AddProductModal = () => {
    const auth = useAuth()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = useRef()
    const { register, handleSubmit } = useForm();
    const addProduct = async (product: Product) => {
        await createProduct({owner: auth.user.uid, ...product})
    }


    return (
        <div>
            <Button variant={`solid`} size={`md`} onClick={onOpen} colorScheme={`teal`} fontWeight={`medium`}>
                Adicione seu primeiro produto
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
                            <Input name={`name`} ref={register({required: 'Required'})} placeholder="Qual é o nome do seu produto?"/>
                        </FormControl>

                        <FormControl marginTop={4}>
                            <FormLabel>Descrição</FormLabel>
                            <Textarea name={`description`} ref={register({required: 'Required'})} placeholder="Descreva brevemente seu produto..."/>
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