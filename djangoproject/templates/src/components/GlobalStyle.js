import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
:root{
    --color-white:${({ theme }) => theme.white};
    --color-dark:${({ theme }) => theme.dark};
    --color-text-muted:${({ theme }) => theme.muted};
    --color-light:${({ theme }) => theme.light};
    --color-background:${({ theme }) => theme.background};
    --card-padding:1.8rem;
    --padding-1:1.2rem;
    --box-shadow:${({ theme }) => theme.shadow};
    }
    
`