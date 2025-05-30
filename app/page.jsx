'use client';
import React, { useState, useEffect } from 'react';
import { Check, X, BookOpen, GraduationCap, ChevronDown, ChevronRight } from 'lucide-react';

const CourseTracker = () => {
    const [completedCourses, setCompletedCourses] = useState({});
    const [totalCredits, setTotalCredits] = useState(0);
    const [expandedCategories, setExpandedCategories] = useState({});

    const requirements = [
        {
            category: 'Wellness Requirement',
            minCredits: 2,
            courses: [
                {
                    code: 'APPH 1040',
                    name: 'Scientific Foundations of Health',
                    credits: 2,
                },
                {
                    code: 'APPH 1050',
                    name: 'The Science of Physical Activity and Health',
                    credits: 2,
                },
                {
                    code: 'APPH 1060',
                    name: 'Flourishing: Strategies for Well-being and Resilience',
                    credits: 2,
                },
            ],
            selectOne: true,
        },
        {
            category: 'Institutional Priority',
            minCredits: 3,
            courses: [
                { code: 'CS 1301', name: 'Introduction to Computing', credits: 3 },
                { code: 'CS 1371', name: 'Computing for Engineers', credits: 3 },
            ],
            selectOne: true,
        },
        {
            category: 'Mathematics and Quantitative Skills',
            minCredits: 4,
            courses: [{ code: 'MATH 1552', name: 'Integral Calculus', credits: 4 }],
            required: true,
        },
        {
            category: 'Political Science and U.S. History',
            minCredits: 3,
            courses: [
                { code: 'HIST 2111', name: 'The United States to 1877', credits: 3 },
                { code: 'HIST 2112', name: 'The United States since 1877', credits: 3 },
                {
                    code: 'INTA 1200',
                    name: 'American Government in Comparative Perspective',
                    credits: 3,
                },
                {
                    code: 'POL 1101',
                    name: 'Government of the United States',
                    credits: 3,
                },
                {
                    code: 'PUBP 3000',
                    name: 'American Constitutional Issues',
                    credits: 3,
                },
            ],
            selectOne: true,
        },
        {
            category: 'Arts, Humanities, and Ethics',
            minCredits: 6,
            courses: [{ code: 'HUM', name: 'Any HUM course', credits: 6, flexible: true }],
        },
        {
            category: 'Communicating in Writing',
            minCredits: 6,
            courses: [
                { code: 'ENGL 1101', name: 'English Composition I', credits: 3 },
                { code: 'ENGL 1102', name: 'English Composition II', credits: 3 },
            ],
            required: true,
        },
        {
            category: 'Technology, Mathematics, and Sciences',
            minCredits: 12,
            courses: [
                { code: 'PHYS 2211', name: 'Principles of Physics I', credits: 4 },
                { code: 'PHYS 2212', name: 'Principles of Physics II', credits: 4 },
                { code: 'MATH 1551', name: 'Differential Calculus', credits: 2 },
                {
                    code: 'MATH 1553',
                    name: 'Introduction to Linear Algebra',
                    credits: 2,
                },
                { code: 'MATH 1554', name: 'Linear Algebra', credits: 2 },
                {
                    code: 'MATH 1564',
                    name: 'Linear Algebra with Abstract Vector Spaces',
                    credits: 2,
                },
            ],
            note: 'PHYS courses required, choose one MATH linear algebra course',
        },
        {
            category: 'Social Sciences',
            minCredits: 9,
            courses: [{ code: 'SS', name: 'Any SS course', credits: 9, flexible: true }],
        },
        {
            category: 'Field of Study',
            minCredits: 18,
            courses: [
                { code: 'MATH 2551', name: 'Multivariable Calculus', credits: 4 },
                { code: 'MATH 2552', name: 'Differential Equations', credits: 4 },
                {
                    code: 'CHEM 1310',
                    name: 'Principles of General Chemistry for Engineers',
                    credits: 4,
                },
                { code: 'CHEM 1211K', name: 'Chemical Principles I', credits: 4 },
                {
                    code: 'PHYS 2213',
                    name: 'Introduction to Modern Physics',
                    credits: 3,
                },
                {
                    code: 'PHYS 2XXX',
                    name: 'Any PHYS 2XXX or MATH 2106',
                    credits: 3,
                    flexible: true,
                },
            ],
            note: 'MATH 2551, 2552, PHYS 2213 required; choose CHEM 1310 OR 1211K',
        },
        {
            category: 'Upper-Level Physics',
            minCredits: 29,
            courses: [
                { code: 'PHYS 3120', name: 'Computational Physics', credits: 3 },
                {
                    code: 'PHYS 3122',
                    name: 'Electrostatics and Magnetostatics',
                    credits: 3,
                },
                { code: 'PHYS 3123', name: 'Electrodynamics', credits: 3 },
                { code: 'PHYS 3141', name: 'Thermodynamics', credits: 3 },
                { code: 'PHYS 3143', name: 'Quantum Mechanics I', credits: 3 },
                { code: 'PHYS 3201', name: 'Classical Mechanics I', credits: 3 },
                { code: 'PHYS 3208', name: 'Modern Optics Laboratory', credits: 3 },
                { code: 'PHYS 3209', name: 'Electronics I', credits: 3 },
                { code: 'PHYS 4321', name: 'Advanced Laboratory I', credits: 3 },
                { code: 'PHYS 4604', name: 'Professional Development', credits: 1 },
                { code: 'PHYS 4605', name: 'Scientific Communication', credits: 1 },
            ],
            required: true,
        },
        {
            category: 'Physics or Technical Electives',
            minCredits: 15,
            courses: [
                {
                    code: 'PHYS_ELECTIVE',
                    name: 'Any PHYS course',
                    credits: 3,
                    flexible: true,
                },
                { code: 'CHEM 3411', name: 'Physical Chemistry I', credits: 3 },
                { code: 'CHEM 3412', name: 'Physical Chemistry II', credits: 3 },
                { code: 'CHEM 3511', name: 'Survey of Biochemistry', credits: 3 },
                { code: 'EAS 2750', name: 'Introduction to Ocean Science', credits: 3 },
                { code: 'EAS 4300', name: 'Atmospheric Physics', credits: 3 },
                { code: 'EAS 4430', name: 'Introduction to Oceanography', credits: 3 },
                {
                    code: 'MATH 2106',
                    name: 'Foundations of Mathematical Proof',
                    credits: 3,
                },
                {
                    code: 'MATH 3215',
                    name: 'Introduction to Probability and Statistics',
                    credits: 3,
                },
                { code: 'MATH 3235', name: 'Probability Theory', credits: 3 },
                { code: 'MATH 4320', name: 'Advanced Calculus I', credits: 3 },
                {
                    code: 'MATH 4347',
                    name: 'Partial Differential Equations',
                    credits: 3,
                },
                { code: 'MATH 4348', name: 'Differential Geometry', credits: 3 },
                { code: 'MATH 4581', name: 'Abstract Algebra I', credits: 3 },
                {
                    code: 'NRE 3301',
                    name: 'Nuclear and Radiological Engineering and Science',
                    credits: 3,
                },
                { code: 'NRE 4610', name: 'Nuclear Reactor Theory I', credits: 3 },
            ],
            note: 'Select courses totaling 15 credits from PHYS or approved technical electives',
        },
        {
            category: 'Free Electives',
            minCredits: 15,
            courses: [
                {
                    code: 'ELECTIVE_FREE1',
                    name: 'Free Electives',
                    credits: 3,
                    flexible: true,
                },
                {
                    code: 'ELECTIVE_FREE2',
                    name: 'Free Electives',
                    credits: 3,
                    flexible: true,
                },
                {
                    code: 'ELECTIVE_FREE3',
                    name: 'Free Electives',
                    credits: 3,
                    flexible: true,
                },
                {
                    code: 'ELECTIVE_FREE4',
                    name: 'Free Electives',
                    credits: 3,
                    flexible: true,
                },
                {
                    code: 'ELECTIVE_FREE5',
                    name: 'Free Electives',
                    credits: 3,
                    flexible: true,
                },
            ],
        },
    ];

    const toggleCourse = courseCode => {
        setCompletedCourses(prev => ({
            ...prev,
            [courseCode]: !prev[courseCode],
        }));
    };

    const toggleCategory = categoryIndex => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryIndex]: !prev[categoryIndex],
        }));
    };

    const getCategoryStatus = category => {
        const completedCredits = category.courses
            .filter(course => completedCourses[course.code])
            .reduce((sum, course) => sum + course.credits, 0);

        const isComplete = completedCredits >= category.minCredits;
        return { completedCredits, isComplete };
    };

    useEffect(() => {
        const total = Object.keys(completedCourses)
            .filter(code => completedCourses[code])
            .reduce((sum, code) => {
                const course = requirements.flatMap(cat => cat.courses).find(c => c.code === code);
                return sum + (course?.credits || 0);
            }, 0);
        setTotalCredits(total);
    }, [completedCourses]);

    const overallProgress = (totalCredits / 122) * 100;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-800">Physics Degree Requirements Tracker</h1>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold text-blue-800">Overall Progress</span>
                        <span className="text-lg font-bold text-blue-800">{totalCredits}/122 credits</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-3">
                        <div
                            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(overallProgress, 100)}%` }}
                        ></div>
                    </div>
                    <div className="text-sm text-blue-700 mt-1">{overallProgress.toFixed(1)}% complete</div>
                </div>
            </div>

            <div className="space-y-6">
                {requirements.map((category, categoryIndex) => {
                    const status = getCategoryStatus(category);
                    const isExpanded = expandedCategories[categoryIndex] !== true; // Default to expanded

                    return (
                        <div key={categoryIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div
                                className={`p-4 cursor-pointer ${status.isComplete ? 'bg-green-100' : 'bg-red-50'}`}
                                onClick={() => toggleCategory(categoryIndex)}
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                        {isExpanded ? (
                                            <ChevronDown className="w-5 h-5 text-gray-600" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-600" />
                                        )}
                                        {status.isComplete ? (
                                            <Check className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <X className="w-5 h-5 text-red-600" />
                                        )}
                                        {category.category}
                                    </h2>
                                    <div className="text-right">
                                        <div className={`text-sm font-medium ${status.isComplete ? 'text-green-700' : 'text-red-700'}`}>
                                            {status.completedCredits}/{category.minCredits} credits
                                        </div>
                                        {category.selectOne && <div className="text-xs text-gray-600">Choose one</div>}
                                        {category.required && <div className="text-xs text-blue-600">All required</div>}
                                    </div>
                                </div>
                                {category.note && <div className="text-sm text-gray-600 mt-2 italic">{category.note}</div>}
                            </div>

                            {isExpanded && (
                                <div className="p-4">
                                    <div className="grid gap-2">
                                        {category.courses.map((course, courseIndex) => (
                                            <div
                                                key={courseIndex}
                                                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all cursor-pointer hover:shadow-sm ${completedCourses[course.code]
                                                        ? 'border-green-300 bg-green-50'
                                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                                    }`}
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    toggleCourse(course.code);
                                                }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${completedCourses[course.code] ? 'border-green-500 bg-green-500' : 'border-gray-300'
                                                            }`}
                                                    >
                                                        {completedCourses[course.code] && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-800">{course.code}</div>
                                                        <div className="text-sm text-gray-600">{course.name}</div>
                                                    </div>
                                                </div>
                                                <div className="text-sm font-medium text-gray-700">
                                                    {course.credits} credit
                                                    {course.credits !== 1 ? 's' : ''}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Degree Summary
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600">{totalCredits}</div>
                        <div className="text-sm text-blue-800">Credits Completed</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-orange-600">{122 - totalCredits}</div>
                        <div className="text-sm text-orange-800">Credits Remaining</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">{overallProgress.toFixed(1)}%</div>
                        <div className="text-sm text-green-800">Degree Complete</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseTracker;
