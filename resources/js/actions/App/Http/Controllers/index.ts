import StaticPageController from './StaticPageController'
import DashboardController from './DashboardController'
import PaymentController from './PaymentController'
import Admin from './Admin'
import OrderController from './OrderController'
import Settings from './Settings'
const Controllers = {
    StaticPageController: Object.assign(StaticPageController, StaticPageController),
DashboardController: Object.assign(DashboardController, DashboardController),
PaymentController: Object.assign(PaymentController, PaymentController),
Admin: Object.assign(Admin, Admin),
OrderController: Object.assign(OrderController, OrderController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers