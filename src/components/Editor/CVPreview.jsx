import React from 'react';
import ProfessionalLayout from '../Layouts/templates/ProfessionalLayout';
import ModernLayout from '../Layouts/templates/ModernLayout';
import CreativeLayout from '../Layouts/templates/CreativeLayout';

const CVPreview = ({ data, layout }) => {
    const layoutComponents = {
        professional: ProfessionalLayout,
        modern: ModernLayout,
        creative: CreativeLayout,
    };

    const LayoutComponent = layoutComponents[layout] || ProfessionalLayout;

    return (
        <div className="cv-preview-wrapper">
            <LayoutComponent data={data} />
        </div>
    );
};

export default CVPreview;
