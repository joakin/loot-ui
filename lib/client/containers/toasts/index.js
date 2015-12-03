import { connect } from 'react-redux'
import Toasts from '../../components/toasts'

function selectToasts ({ toasts }) { return { toasts } }
export default connect(selectToasts)(Toasts)
