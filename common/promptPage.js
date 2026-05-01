import React, { useEffect, useState } from "react";
// import { Prompt } from 'react-router'
import WarningModal from "./warningModal";

const RouteLeavingGuard = ({ when, navigate, shouldBlockNavigation }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [lastLocation, setLastLocation] = useState(null);
	const [confirmedNavigation, setConfirmedNavigation] = useState(false);

	React.useEffect(() => {
		// Only set beforeunload warning, don't block browser navigation
		window.onbeforeunload = when ? () => true : null;
		
		// Clear any existing hash that blocks navigation
		if (window.location.hash === '#no-back-button' || window.location.hash === '#Again-No-back-button') {
			history.replaceState(null, null, window.location.pathname);
		}
		
		return () => {
			window.onbeforeunload = null;
			// Clean up hash change event if it was set elsewhere
			window.onhashchange = null;
		};
	}, [when]);

	//   React.useEffect(() => {
	//     if(!when){
	//     setModalVisible(true);
	//     }else{
	//       window.onbeforeunload = null;
	//     }
	//   // window.onbeforeunload = !modalVisible ? () => true : null;
	//   // return () => {
	//   //   window.onbeforeunload = null;
	//   // };
	// }, [when]);

	const closeModal = () => {
		setModalVisible(false);
	};
	const handleBlockedNavigation = (nextLocation) => {
		if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
			setModalVisible(true);
			setLastLocation(nextLocation);
			return false;
		}
		return true;
	};
	const handleConfirmNavigationClick = () => {
		setModalVisible(false);
		setConfirmedNavigation(true);
	};
	useEffect(() => {
		if (confirmedNavigation && lastLocation) {
			// Navigate to the previous blocked location with your navigate function
			navigate(lastLocation.pathname);
		}
	}, [confirmedNavigation, lastLocation]);
	return (
		<>
			{/* <Prompt when={when} message={handleBlockedNavigation} /> */}
			<WarningModal
				open={modalVisible}
				titleText="Close without saving?"
				contentText="You have unsaved changes. Are you sure you want to leave this page without saving?"
				cancelButtonText="DISMISS"
				confirmButtonText="CONFIRM"
				onCancel={closeModal}
				onConfirm={handleConfirmNavigationClick}
			/>
		</>
	);
};
export default RouteLeavingGuard;
