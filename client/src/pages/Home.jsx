import { CalendarDays, ChevronDown, CircleCheckBig, Earth, Facebook, Linkedin, ListChecks, ShieldUser, Star, Twitter, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Text from '../components/Text.jsx';
import {DotLottieReact} from '@lottiefiles/dotlottie-react'
import Buttons from '../components/Buttons';
import { data } from '../data/data.json';
import { Activity, useEffect, useState } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const whyIcon = { ListChecks: ListChecks, CalendarDays: CalendarDays, ShieldUser: ShieldUser };
    const aboutIcon = { Users: Users, CircleCheckBig: CircleCheckBig, Earth: Earth, Star: Star };
    const { how, whyus, about, team, faqs } = data;
    const [openIndex, setOpenIndex] = useState(0);

    useEffect(() => {
        const reset = () => {
            setOpenIndex(0);
        };

        reset();
    }, [faqs]);

    const handleToggle = (i) => {
        setOpenIndex(openIndex === i ? 1 : i);
    };

    return (
        <div className='w-full flex-1'>
            <section id='home' className='section'>
                <div className="wrapper">
                    <div className="w-full flex items-center justify-center flex-wrap">
                        <div className="w-fit xl:w-wax h-fit flex items-center justify-center gap-0">
                            <Text variant='h1' weight='bold'>Stop Juggling</Text>
                            <DotLottieReact src='https://lottie.host/4b3148df-4e4c-4537-93c9-9d0885ce6532/m9uj411IcR.lottie' loop autoplay className='w-auto h-20 md:h-30 object-cover -mx-8' />
                        </div>
                        <Text variant='h1' weight='bold'>your tasks,</Text>
                    </div>
                    
                    <Text variant='h1' weight='bold' className='w-full text-center'>Start building your momentum. Find your</Text>
                    
                    <div className="w-full flex items-center justify-center flex-wrap">
                        <div className="w-fit xl:w-wax h-fit flex items-center justify-center gap-0">
                            <Text variant='h1' weight='bold'>Flow and</Text>
                            <DotLottieReact src='https://lottie.host/b94836c3-a7e0-4005-bea0-aa910942d79d/AwYkBYdL4h.lottie' loop autoplay className='w-auto h-16 md:h-30 object-cover mx-1' />
                        </div>
                        <Text variant='h1' weight='bold'>Master your days.</Text>
                    </div>
                    
                    <Text weight='medium' className='w-full text-center text-slate-600 mx-auto container mt-6 mb-8'>The intuitive task manager that helps you build work-flows, crush deadlines and achieve your goals.</Text>

                    <div className="w-full md:max-w-md flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mt-6">
                        <Buttons type='button' variant='secondaryFW' handleClick={() => navigate('/#how-it-works')}>Explore more</Buttons>
                        <Buttons type='button' variant='primaryFW' handleClick={() => navigate('/login')}>Get started</Buttons>
                    </div>

                </div>
            </section>
            <section id='about' className="section">
                <div className="w-full container mx-auto flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12">
                    <div className="w-full lg:w-1/2 flex flex-col items-start justify-start">
                        <Text weight='medium' className='w-full text-center lg:text-left text-indigo-500 uppercase'>About</Text>
                        <Text variant='h2' weight='bold' className='w-full text-center lg:text-left mb-2'>Our Driving force</Text>
                        <Text className='w-full text-center lg:text-left text-slate-600'>Fueled by frustration of overwhelming task managers, we created Momentum. Our purpose is simple: to provide clearity and tools you need to stop juggeling tasks and start building real, meaningful momentum towards your goals.</Text>
                        <Text weight='semibold' className='w-full mt-8 text-left text-indigo-500 bg-indigo-200 p-6 border-l-6 border-indigo-500 rounded-lg'>"Sophistication lies in the flow, not in friction. Momentum is powerful enough to organize your ambitions, yet intuitive enough to get out of your way, letting you build your flow."</Text>
                    </div>

                    <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6">
                        <Activity mode={about ? 'visible' : 'hidden'}>
                            {about.map((item, i) => {
                                const Icon = aboutIcon[item.icon];

                                return (
                                    <div key={i} className='about-box'>
                                        <div className={`${item.color} p-5 aspect-square rounded-full`}>
                                            <Icon className='w-8 h-8' />
                                        </div>
                                        <Text variant='h6' weight='bold' className='w-full text-center mt-4'>{item.title}</Text>
                                        <Text className='w-full text-center text-slate-600'>{item.text}</Text>
                                    </div>
                                );
                            })}
                        </Activity>
                    </div>
                </div>
            </section>
            
            <section id="why-us" className="section">
                <div className="wrapper gap-10 xl:gap-20">
                    <div className="header-center">
                        <Text weight='medium' className='w-full text-center text-indigo-500 uppercase'>Why choose Momentum?</Text>
                        <Text variant='h2' weight='bold' className='w-full text-center'>Find Clearity, Achieve More & Master Your Schedules.</Text>
                        <Text className='w-full text-center text-slate-600'>Because productivity isn't about doing more--it's about doing what matters. Momentum provides the clearity and tools to focus your energy on what matters, so you can achieve more with less efforts.</Text>
                    </div>

                    <div className="grid-c3">
                        <Activity mode={whyus ? 'visible' : 'hidden'}>
                            {whyus.map((item, i) => {
                                const Icon = whyIcon[item.icon];

                                return (
                                    <div key={i} className='why-box'>
                                        <Icon className='size-10 text-indigo-500' />
                                        <Text variant='h4' weight='semi-bold' className='w-full text-center mt-4'>{item.title}</Text>
                                        <Text className='w-full text-center text-slate-600'>{item.text}</Text>
                                    </div>
                                );
                            })}
                        </Activity>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="section">
                <div className="wrapper gap-10 xl:gap-20">
                    <div className="header-center">
                        <Text weight='medium' className='w-full text-center text-indigo-500 uppercase'>How it works</Text>
                        <Text variant='h1' weight='bold' className='w-full text-center'>Build your momentum in 4 simple steps.</Text>
                        <Text className='w-full text-center text-slate-600'>From a scattered list to a clear plan of action. Momentum helps you capture, organize, & conquer your tasks with a natural flowling rythm.</Text>
                    </div>

                    <div className="grid-c4">
                        <Activity mode={how ? 'visible' : 'hidden'}>
                            {how.map((item, i) => (
                                <div key={i} className='how-box'>
                                    <div className="bg-indigo-500 text-white p-2 flex items-center justify-center rounded-full aspect-square text-center mb-6">
                                        <Text variant='h5' weight='bold'>{item.step}</Text>
                                    </div>
                                    <Text variant='h4' weight='semibold' className='w-full text-center'>{item.title}</Text>
                                    <Text className='w-full text-center text-slate-600'>{item.text}</Text>
                                </div>
                            ))}
                        </Activity>
                    </div>
                </div>
            </section>

            <section id="team" className="section">
                <div className="wrapper gap-10 xl:gap-20">
                    <div className="heading-center">
                        <Text weight='medium' className='w-full text-center text-indigo-500 uppercase'>Our team</Text>
                        <Text variant='h1' weight='bold' className='w-full text-center'>the minds behind Momentum.</Text>
                        <Text className='w-full text-center text-slate-600'>We're a diverse group of designers, developers, and productive nerds united by one simple mission: to help you find focus and achieve your goals.</Text>
                    </div>
                            
                    <div className="grid-c4">
                        <Activity mode={team ? 'visible' : 'hidden'}>
                            {team.map((item, i) => (
                                <div key={i} className='team-box'>
                                    <img src={item.img} alt={item.name} />
                                    <div className="team-box-container">
                                        <div className="team-box-wrapper">
                                            <Text variant='h6' weight='bold' className='w-full text-center'>{item.name}</Text>
                                            <Text weight='medium' className='w-full text-center text-slate-600'>{item.position}</Text>
                                        </div>
                                        <Text className='w-full text-center text-slate-600'>{item.description}</Text>
                                    </div>
                                    <div className="team-box-social">
                                        <Buttons type='button' variant='iconOnlyNoBr' handleClick={() => navigate(`${item.linkedIn}`)}><Linkedin className='w-6 h-6'/></Buttons>
                                        <Buttons type='button' variant='iconOnlyNoBr' handleClick={() => navigate(`${item.facebook}`)}><Facebook className='w-6 h-6'/></Buttons>
                                        <Buttons type='button' variant='iconOnlyNoBr' handleClick={() => navigate(`${item.twitter}`)}><Twitter className='w-6 h-6'/></Buttons>
                                    </div>
                                </div>
                            ))}
                        </Activity>
                    </div>
                </div>
            </section>

            <section id="cta" className="section bg-linear-[108deg] from-indigo-500 to-purple-500 text-white">
                <div className="wrapper gap-10">
                    <div className="w-full flex flex-col justify-center items-center gap-2">
                        <Text variant='h2' weight='bold' className='text-center'>Ready to boost your productivity?</Text>
                        <Text className='text-center my-4 text-slate-200'>Join thousands of users who have transformered their task management with Momentum.</Text>
                    </div>
                    <div className="w-full flex h-max items-center justify-center">
                        <Buttons type='button' variant='white' handleClick={() => navigate('/register')}>Create your account now!</Buttons>
                    </div>
                </div>
            </section>

            <section id="faqs" className="section">
                <div className="wrapper gap-10 xl:gap-20">
                    <div className="heading-center">
                    <Text weight='medium' className='w-full text-center text-indigo-500 uppercase'>FAQs</Text>
                        <Text variant='h1' weight='bold' className='w-full text-center'>Get Back to your Momentom.</Text>
                        <Text className='w-full text-center text-slate-600'>Find quick answers to common questions about your account, features, and more so you can return to what matters most.</Text>
                    </div>

                    <div className="w-full md:max-w-2xl h-max flex flex-col items-start justify-center gap-6 overflow-hidden">
                        <Activity mode={faqs ? 'visible' : 'hidden'}>
                            {faqs.map((item, i) => (
                                <div key={i} className='w-full bg-white rounded-md shadow-lg overflow-hidden'>
                                    <button type='button' className='w-full p-6 flex justify-between items-center cursor-pointer' onClick={() => handleToggle(i)}>
                                        <Text weight='medium' className='text-left'>{item.question}</Text>
                                        <ChevronDown className={`w-8 h-8 transition-transform duration-300 ease-in-out ${openIndex === i ? 'rotate-180' : ''}`}/>
                                    </button>
                                    <div className={`grid transition-all duration-200 ease-in-out ${openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                            <Text className='px-6 pb-6 text-left text-slate-600'>{item.answer}</Text>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Activity>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
