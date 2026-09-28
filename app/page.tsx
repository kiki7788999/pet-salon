import Header from '../components/Header';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Services from '../components/Services';
import Care from '../components/Care';
import Visit from '../components/Visit';
import Footer from '../components/Footer';
import { BookingProvider } from '../components/Booking';
import Environment from '../components/Environment';
export default function Page() { return <BookingProvider><div className="wrap"><Header /><main><Hero /><Benefits /><Services /><Care /><Environment /><Visit /></main><Footer /></div></BookingProvider>; }
