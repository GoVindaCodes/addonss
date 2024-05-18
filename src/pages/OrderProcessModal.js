// import React, { useState } from "react";
// import MobileOTPComponent from "./MobileOTPComponent";
// import AddressEntryComponent from "./AddressEntryComponent";
// import OrderSummaryComponent from "./OrderSummaryComponent";
// import PaymentMethods from "./PaymentMethods";
// import { Modal, Button, ModalBody } from "@windmill/react-ui";
// import { t } from "i18next";

// const OrderProcessModal = ({ id, onClose, selectedPaymentMethod }) => {
//     const [submittedAddress, setSubmittedAddress] = useState("");
//     const handleAddressSubmit = (address) => {
//         setSubmittedAddress(address);
//         console.log("hi:", address)
//     };
//     console.log("Rendering OrderProcessModal with id:", id, "selectedPaymentMethod:", selectedPaymentMethod); // Add this log to check props
//     console.log("Submitted Address in OrderProcessModal:", submittedAddress); // Add this log to check the submitted address

//     return (
//         <Modal>
//             <ModalBody>
//                 {/* <button onClick={handlePaymentMethod}>hey</button> */}
//                 <h2 className="text-xl font-medium mb-2">
//                     {t("PaymentMethodsModalTitle")}
//                 </h2>
//                 <MobileOTPComponent />
//                 <AddressEntryComponent onSubmit={handleAddressSubmit} />
//                 <PaymentMethods />
//                 <OrderSummaryComponent id={id} selectedPaymentMethod={selectedPaymentMethod} address={submittedAddress} />
//                 {/* <Button onClick={onClose}>Close</Button> */}
//             </ModalBody>
//         </Modal>
//     );
// };

// export default OrderProcessModal;

import React, { useState } from "react";
import MobileOTPComponent from "./MobileOTPComponent";
import AddressEntryComponent from "./AddressEntryComponent";
import OrderSummaryComponent from "./OrderSummaryComponent";
import PaymentMethods from "./PaymentMethods";
import { t } from "i18next";
import ProductServices from "services/ProductServices";
import useAsync from "hooks/useAsync";

const OrderProcessModal = ({ id, onClose, selectedPaymentMethod }) => {
    const [submittedAddress, setSubmittedAddress] = useState("");
    const [selectedComponent, setSelectedComponent] = useState("MobileOTPComponent");
    const { data, loading } = useAsync(() => ProductServices.getProductById(id));
    const handleAddressSubmit = (address) => {
        setSubmittedAddress(address);
        console.log("hi:", address)
    };

    return (
        <div className="flex flex-col w-full rounded-lg">
            <div className="flex-shrink-0 overflow-hidden flex items-center justify-center h-auto">
                {data && Array.isArray(data.image) && data.image.length > 0 ? (
                    <div className="flex flex-row">
                        {data.image.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`product-${index}`}
                                className="h-64 w-64 mr-2"
                            />
                        ))}
                    </div>
                ) : (
                    <img
                        src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                        alt="product"
                        className="h-64 w-64"
                    />
                )}
            </div>
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
                <div className="p-4">
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2">Buy Now</label>
                        <span className="font-bold ml-0 mr-16 p-1">Step 1:</span>
                        <span className="font-bold mr-16 ml-6" >Step 2:</span>
                        <span className="font-bold ml-8">Step 3:</span>
                        <div className="flex flex-wrap gap-4">
                            <button className={`px-4 py-2 bg-gray-200 rounded-md ${selectedComponent === "MobileOTPComponent" ? "bg-blue-500 text-white" : ""}`} onClick={() => setSelectedComponent("MobileOTPComponent")}>Mobile OTP Component</button>
                            <button className={`px-4 py-2 bg-gray-200 rounded-md ${selectedComponent === "AddressEntryComponent" ? "bg-blue-500 text-white" : ""}`} onClick={() => setSelectedComponent("AddressEntryComponent")}>Address Entry</button>
                            {/* <button className={`px-4 py-2 bg-gray-200 rounded-md ${selectedComponent === "PaymentMethods" ? "bg-blue-500 text-white" : ""}`} onClick={() => setSelectedComponent("PaymentMethods")}>Payment Methods</button> */}
                            <button className={`px-4 py-2 bg-gray-200 rounded-md ${selectedComponent === "OrderSummaryComponent" ? "bg-blue-500 text-white" : ""}`} onClick={() => setSelectedComponent("OrderSummaryComponent")}>Order Summary</button>
                        </div>
                    </div>
                    {selectedComponent === "MobileOTPComponent" && <MobileOTPComponent />}
                    {selectedComponent === "AddressEntryComponent" && <AddressEntryComponent onSubmit={handleAddressSubmit} />}
                    {/* {selectedComponent === "PaymentMethods" && <PaymentMethods />} */}
                    {selectedComponent === "OrderSummaryComponent" && <OrderSummaryComponent id={id} selectedPaymentMethod={selectedPaymentMethod} address={submittedAddress} />}
                    {/* <div className="text-right">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onClose}>Close</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default OrderProcessModal;

