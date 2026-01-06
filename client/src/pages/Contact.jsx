import { Mail, Phone, User, Video } from 'lucide-react';
import Text from '../components/Text.jsx';
import Buttons from '../components/Buttons';
import { data } from '../data/data.json';
import { Activity } from 'react';

const Contact = () => {
    const mapIcon = { Mail: Mail, Video: Video, Phone: Phone };
    const { contact } = data;

    return (
        <div id='contact' className='w-full min-h-screen'>
            <section className='section-sm'>
                <div className="wrapper">
                    <div className="w-full flex flex-col xl:flex-row items-center justify-center xl:justify-between gap-8">
                        <div className="w-full xl:w-5/12 flex flex-col items-start justify-start gap-8">
                            <div className="heading-left">
                                <Text weight='medium' className='w-full text-indigo-500 uppercase'>Get in touch</Text>
                                <Text variant='h2' weight='medium' className='w-full'>Tell us what is on your mind!</Text>
                                <Text className='w-full text-slate-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</Text>
                            </div>

                            <div className="w-full h-max flex flex-col gap-6">
                                
                                <div className="w-full relative">
                                    <div className="w-full absolute flex items-center pl-4 left-0 inset-y-0 pointer-events-none">
                                        <User className='w-5 h-5 text-slate-500' />
                                    </div>
                                    <input type="text" name='contact_name' id='contact_name' placeholder='Full Name' className='contact-field' />
                                </div>
                                
                                <div className="w-full relative">
                                    <div className="w-full absolute flex items-center pl-4 left-0 inset-y-0 pointer-events-none">
                                        <Mail className='w-5 h-5 text-slate-500' />
                                    </div>
                                    <input type="email" name='contact_email' id='contact_email' placeholder='Enter your email' className='contact-field' />
                                </div>
                                
                                <div className="w-full relative">
                                    <div className="w-full absolute flex items-center pl-4 left-0 inset-y-0 pointer-events-none">
                                        <Phone className='w-5 h-5 text-slate-500' />
                                    </div>
                                    <input type="phone" name='contact_phone' id='contact_phone' placeholder='Enter WhatsApp Number' className='contact-field' />
                                </div>

                                <textarea name="contact_msg" id="contact_msg" cols='30' rows='5' placeholder='Type your message here...' className='px-6 py-3 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-indigo-500 focus:text-slate-600'></textarea>

                                <Buttons type='submit' variant='primaryFW' className='mt-6'>Submit</Buttons>
                            </div>
                        </div>
                        <div className="w-full xl:w-6/12 h-fit flex justify-center items-center">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.627371765292!2d72.80495937594267!3d19.471626239432045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9f4fcf0ad47%3A0xe114fbbb6c86ebd1!2sBachraj%20Landmark%2C%20Evershine%20Globle%20City%2C%20Dongarpada%2C%20Rustomjee%20Global%20City%2C%20Virar%20West%2C%20Virar%2C%20Maharashtra%20401303!5e0!3m2!1sen!2sin!4v1760245835111!5m2!1sen!2sin" loading="lazy" className='w-full h-[400px] lg:h-[80vh]'></iframe>
                        </div>
                    </div>
                </div>
            </section>
            <section className='section-sm'>
                <div className="wrapper">
                    <div className="w-full flex flex-col lg:flex-row gap-12">
                        <Activity mode={contact ? 'visible' : 'hidden'}>
                            {contact.map((item, i) => {
                                const Icon = mapIcon[item.icon];

                                return (
                                    <div key={i} className='contact-box group'>
                                        <div className="w-full flex items-center justify-center xl:justify-start">
                                            <div className="rounded-full p-4 bg-indigo-500 aspect-square text-white">
                                                <Icon className='w-8 h-8' />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col h-full">
                                            <Text variant='h4' weight='bold' className='w-full text-center xl:text-left'>{item.title}</Text>
                                            <Text className='w-3/5 lg:w-full mx-auto xl:m-0 text-center xl:text-left text-slate-600'>{item.text}</Text>
                                        </div>
                                            <Text className='w-full text-center xl:text-left group-hover:text-indigo-500 group-hover:font-bold'>{item.label}</Text>
                                    </div>
                                );
                            })}
                        </Activity>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
