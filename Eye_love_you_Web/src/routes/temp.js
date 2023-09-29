import React, { useState } from 'react';

function App() {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div><br /><br /><br /><br /><br /><br /><br />
            <button onClick={openModal}>모달 열기</button>
            {isModalOpen && (
                <div className="warning_modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>모달 내용</h2>
                        <p>모달 내용을 여기에 추가하세요.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
