import { useState, useRef, useEffect } from 'react';
import './Modal.css';

export default function Modal({ component }) {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ width: 'auto', height: 'auto' });
    const modalRef = useRef(null);
    const headerRef = useRef(null);
    const iconRef = useRef(null);
    const componentRef = useRef(null);
    const componentSizeRef = useRef({ width: 0, height: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const parentRect = modalRef.current.parentElement.getBoundingClientRect();
                setPosition({
                    x: e.clientX - parentRect.left - offset.x,
                    y: e.clientY - parentRect.top - offset.y
                });
            }
            if (iconRef.current && iconRef.current.dataset.dragging === 'true') {
                setSize({
                    width: e.clientX - modalRef.current.getBoundingClientRect().left,
                    height: e.clientY - modalRef.current.getBoundingClientRect().top
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            if (iconRef.current) {
                iconRef.current.dataset.dragging = 'false';
            }
        };

        const handleMouseLeave = () => {
            setIsDragging(false);
            if (iconRef.current) {
                iconRef.current.dataset.dragging = 'false';
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isDragging, offset]);

    useEffect(() => {
        if (componentRef.current) {
            const { width, height } = componentRef.current.getBoundingClientRect();
            componentSizeRef.current = { width, height };
        }
    }, [component]);

    const handleMouseDown = (e) => {
        if (e.target === headerRef.current) {
            setIsDragging(true);
            const modalRect = modalRef.current.getBoundingClientRect();
            const offsetX = e.clientX - modalRect.left;
            const offsetY = e.clientY - modalRect.top;
            setOffset({ x: offsetX, y: offsetY });
        }
    };

    const handleIconMouseDown = (e) => {
        iconRef.current.dataset.dragging = 'true';
    };

    return (
        <div
            className="modal_wrap"
            style={{ left: position.x, top: position.y, width: size.width, height: size.height }}
            ref={modalRef}
        >
            <div
                className="modal_header"
                ref={headerRef}
                onMouseDown={handleMouseDown}
            ></div>
            <div ref={componentRef}>
                {component}
            </div>
            <i className='xi-signal' ref={iconRef} onMouseDown={handleIconMouseDown}></i>
        </div>
    );
}
