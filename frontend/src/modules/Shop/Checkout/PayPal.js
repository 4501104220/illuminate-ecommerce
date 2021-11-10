import {useDispatch, useSelector} from "react-redux";
import Router from "next/router";
import {addUserInfo} from "./checkout.slice";
import api from "services/axios";

async function createOrder(order) {
    try {
        const {data} = await api.post(`/api/order`, order);
        if (data) {
            return data.order;
        }
    } catch (err) {
        console.log(err);
    }
}

const usdExchangeRate = 23176;
const vndToUsd = (money) => Math.round((money / usdExchangeRate) * 100) / 100;

export default function Paypal({order}) {
    const paypal = React.useRef();
    const dispatch = useDispatch();

    let totalUSDPrice = 0;
    const orderItems = order.orderItems.map((item) => {
        totalUSDPrice += vndToUsd(item.price) * item.quantity;
        return {
            unit_amount: {
                currency_code: "USD",
                value: vndToUsd(item.price),
            },
            quantity: item.quantity,
            name: item.title,
        };
    });

    React.useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Thanh toán hóa đơn",
                                amount: {
                                    value: totalUSDPrice,
                                    currency_code: "USD",
                                    breakdown: {
                                        item_total: {
                                            currency_code: "USD",
                                            value: totalUSDPrice,
                                        },
                                    },
                                },
                                items: orderItems,
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const result = await actions.order.capture();
                    const {description, amount, payee} = result.purchase_units[0];

                    if (result.status === "COMPLETED") order.isPaid = true;

                    order.payment.paymentDetail = {
                        id: result.id,
                        payer: result.payer,
                        purchase_units: {description, amount, payee},
                    };

                    const resultCreateOrder = await createOrder(order);
                    console.log(resultCreateOrder);
                    if (resultCreateOrder) Router.push(`/order/${resultCreateOrder._id}`);
                },
                onError: (err) => {
                    throw new Error(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}
