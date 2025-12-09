import React from 'react';
import ProfessionalLayout from '../Layouts/templates/ProfessionalLayout';
import ModernLayout from '../Layouts/templates/ModernLayout';
import CreativeLayout from '../Layouts/templates/CreativeLayout';

// this compoenent accept the props data and layout
const CVPreview = ({ data, layout }) => {
    const layoutComponents = {
        // Mapping layout names to their respective components
        professional: ProfessionalLayout,
        modern: ModernLayout,
        creative: CreativeLayout,
    };

    // Select the appropriate layout component based on the layout prop
    const LayoutComponent = layoutComponents[layout] || ProfessionalLayout;

    return (
        <div className="cv-preview-wrapper">
            <LayoutComponent data={data} />
        </div>
    );
};

export default CVPreview;
