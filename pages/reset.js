import {withApolloPage} from '../lib/withApollo'
import ResetPassword from '../components/ResetPassword'
import { useRouter } from 'next/router'

const Reset = () => {
    const router = useRouter()
    return (
        <ResetPassword resetToken={router.query.resetToken}/>
    )
}

export default withApolloPage(Reset)