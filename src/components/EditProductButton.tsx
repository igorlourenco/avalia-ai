import React, { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
    IconButton,
    Button,
    Box,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Textarea, Select, ModalFooter, Modal, useDisclosure, useToast
} from '@chakra-ui/react';

import { useAuth } from '../libraries/auth';
import {AiFillEdit} from 'react-icons/ai'
import {productCategories} from "../utilitaries/consts";
import {useForm} from "react-hook-form";
import {updateProduct} from "../libraries/database";

const EditProductButton = ({ product }) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()
    const initialRef = useRef()
    const {register, handleSubmit} = useForm();
    const auth = useAuth();

    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)

    const handleUpdateName = (event) => {
        setName(event.target.value)
    }

    const handleUpdateDescription = (event) => {
        setDescription(event.target.value)
    }

    const onSave = async (updatedProduct) => {
        await updateProduct(product.id, {...updatedProduct})

        await mutate(`/api/product/${product.id}`);

        onClose()

        toast({
            title: "Produto atualizado!",
            description: "Os dados do seu produto foram atualizados.",
            status: "success",
            duration: 7000,
            isClosable: true,
        })
    };

    const category = productCategories.find((selectedProduct) => product.category === selectedProduct.value)

    return (
        <>
            <IconButton variant={`ghost`} aria-label="Editar produto" icon={<Box as={AiFillEdit} color={`blue.500`} size={18}/>} onClick={onOpen}/>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent as={`form`} onSubmit={handleSubmit(onSave)}>
                    <ModalHeader fontWeight={`bold`} color={`teal.900`}>Editar produto</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody paddingBottom={6}>
                        <FormControl>
                            <FormLabel color={`teal.900`}>Nome do produto</FormLabel>
                            <Input name={`name`} value={name} onChange={handleUpdateName} ref={register({required: 'Required'})}
                                   placeholder="Qual é o nome do seu produto?"/>
                        </FormControl>

                        <FormControl marginTop={4}>
                            <FormLabel color={`teal.900`}>Descrição</FormLabel>
                            <Textarea name={`description`} value={description} onChange={handleUpdateDescription} ref={register({required: 'Required'})}
                                      placeholder="Descreva brevemente seu produto..."/>
                        </FormControl>

                        <FormControl marginTop={4}>
                            <FormLabel color={`teal.900`}>Qual é a categoria do produto?</FormLabel>
                            <Select name={`category`} ref={register({required: 'Required'})}>
                                <option value={product.category}>{category.label}</option>
                                {
                                    productCategories.map((productCategory, index) => (
                                        <option key={index} value={productCategory.value}>{productCategory.label}</option>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} marginRight={3}>Cancelar</Button>
                        <Button colorScheme={`teal`} type={`submit`}>
                            Salvar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditProductButton;