// ModuleSelector.js
import React from 'react';
import './ModuleSelector.css';

const ModuleSelector = ({
  modules,
  selectedModule,
  selectedSubmodule,
  onModuleChange,
  onSubmoduleChange,
  onStartQuiz,
  disabled,
}) => {
  
  const selectedModuleObj = modules.find((mod) => mod.id === selectedModule);

  return (
    <div className="module-selector">
      <select value={selectedModule} onChange={onModuleChange}>
        <option value="">Select a module</option>
        {modules.map((module) => (
          <option key={module.id} value={module.id}>
            {module.title}
          </option>
        ))}
      </select>

      {selectedModuleObj && selectedModuleObj.subModules && (
        <select value={selectedSubmodule} onChange={onSubmoduleChange}>
          <option value="">Select a submodule</option>
            {selectedModuleObj.subModules.map((submodule) => (
              <option key={submodule.id} value={submodule.id}>
                {submodule.title}
              </option>
            ))}
        </select>
      )}

      <button className="btn" onClick={onStartQuiz} disabled={disabled && !selectedSubmodule}>
        Start Quiz
      </button>
    </div>
  );
};

export default ModuleSelector;

