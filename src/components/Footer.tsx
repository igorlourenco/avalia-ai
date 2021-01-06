import {Flex, Link, Text, TextProps} from '@chakra-ui/react'

const FooterMenuItem = ({label, link}) => {
    return (
        <Link href={link} color={`teal.800`} marginX={2} fontWeight={`bold`} fontSize={10}>
            {label.toString().toUpperCase()}
        </Link>
    )
}

const Separator = (props: TextProps) => <Text fontSize={10} color={`teal.900`} display={[`none`, `block`, `block`, `block`]} {...props}>•</Text>


const Footer = () => {
    return (
        <Flex margin={3} backgroundColor={`transparent`} direction={[`column`, `row`, `row`, `row`]} alignItems={`center`} justifyContent={`center`} height={`30px`}>
            <FooterMenuItem label={`Privacidade`} link={``}/>
            <Separator/>
            <FooterMenuItem label={`Termos`} link={``}/>
            <Separator/>
            <FooterMenuItem label={`Documentação`} link={``}/>
            <Separator/>
            <FooterMenuItem label={`Contato e suporte`} link={``}/>
        </Flex>
    )
}

export default Footer