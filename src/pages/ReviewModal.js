import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
import ReviewForm from "./ReviewForm";
import ProductServices from "services/ProductServices";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const { id } = useParams();
    const [hasReviews, setHasReviews] = useState(false);

    useEffect(() => {
        // Check if the product has any reviews
        async function checkProductReviews() {
            try {
                const product = await ProductServices.getProductById(id);
                setHasReviews(product.reviews.length > 0);
            } catch (error) {
                console.error("Error checking product reviews:", error);
            }
        }

        checkProductReviews();
    }, [id]);

    const handleReviewSubmit = (formData) => {
        onSubmit(formData);
        setSubmitted(true);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
                <h2 className="text-xl font-medium mb-2">
                    {t("WriteReviewModalTitle")}
                </h2>
                {isOpen && !submitted && !hasReviews && (
                    <ReviewForm onSubmit={handleReviewSubmit} />
                )}
                {submitted && <p>{t("ReviewSubmittedMessage")}</p>}
                {hasReviews && <p>{t("ReviewAlreadySubmittedMessage")}</p>}
            </ModalBody>

            <ModalFooter className="justify-center">
                <Button layout="outline" onClick={onClose}>
                    {t("modalKeepBtn")}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ReviewModal;
