import * as React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const WarningModal = (props) => {
	return (
		<div>
			<Modal isOpen={props.open} centered>
				<ModalBody>
					<p>{props.titleText}</p>
					<p>{props.contentText}</p>
					<div className="btn-group-margin text-center mt-4">
						<Button color="border" onClick={props.onCancel}>
							{props.cancelButtonText}
						</Button>
						<Button color="blue" onClick={() => props.onConfirm}>
							{props.confirmButtonText}
						</Button>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default WarningModal;
