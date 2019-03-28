import styled from 'styled-components'
const colors = {
    mainColor: 'red'
}
export const Text = styled.p`
    font-weight: bold
`

export const DateText = styled.p`
    background: yellow
    color: ${colors.mainColor}
`

export const Amount = styled.p`
    background: ${props => props.children >= 50000 ? 'green' : 'red'}
`