import {Flex, Link, Text, TextProps} from '@chakra-ui/react'

const FooterMenuItem = ({label, link}) => {
    return (
        <Link href={link} color={`teal.800`} marginX={2} fontWeight={`bold`} fontSize={12}>
            {label.toString().toUpperCase()}
        </Link>
    )
}

const Separator = (props: TextProps) => <Text color={`teal.900`} {...props}>•</Text>


const Footer = () => {
    return (
        <Flex margin={3} direction={[`column`, `row`, `row`, `row`]} alignItems={`center`} justifyContent={`center`} height={`60px`} shadowBox={`md`}>
            <FooterMenuItem label={`Privacidade`} link={``}/>
            <Separator display={[`none`, `block`, `block`, `block`]}/>
            <FooterMenuItem label={`Termos`} link={``}/>
            <Separator display={[`none`, `block`, `block`, `block`]}/>
            <FooterMenuItem label={`Documentação`} link={``}/>
            <Separator display={[`none`, `block`, `block`, `block`]}/>
            <FooterMenuItem label={`Contato`} link={``}/>
        </Flex>
    )
}

export default Footer