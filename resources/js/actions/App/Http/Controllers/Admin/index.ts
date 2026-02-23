import DeveloperKeyController from './DeveloperKeyController'
import PaymentApprovalController from './PaymentApprovalController'
const Admin = {
    DeveloperKeyController: Object.assign(DeveloperKeyController, DeveloperKeyController),
PaymentApprovalController: Object.assign(PaymentApprovalController, PaymentApprovalController),
}

export default Admin