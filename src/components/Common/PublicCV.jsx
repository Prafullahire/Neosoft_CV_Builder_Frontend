import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import cvService from '../../services/cvService';
import CVPreview from '../Editor/CVPreview';

const PublicCV = () => {
    const { id } = useParams();
    const [cv, setCv] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCV();
    }, [id]);

    const fetchCV = async () => {
        try {
            const data = await cvService.getPublicCV(id);
            setCv(data);
        } catch (error) {
            console.error('Error fetching CV:', error);
            setError('CV not found or not public');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <h2>{error}</h2>
                <p>This CV may be private or does not exist.</p>
            </Container>
        );
    }

    return (
        <Container fluid style={{ padding: '20px', background: '#ecf0f1' }}>
            <CVPreview data={cv} layout={cv.layout} />
        </Container>
    );
};

export default PublicCV;
