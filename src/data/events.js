import event1 from '../assets/event-1.png.jpg';
import event2 from '../assets/event-2.png.jpg';
import event3 from '../assets/event-3.png';
import event4 from '../assets/event-4.png';
import event5 from '../assets/event-5.png';

export const defaultEvents = [
  {
    id: 'default-1',
    images: [event1],
    date: 'March 15, 2025',
    category: 'Food Drive',
    title: 'Community Food Distribution Drive',
    description:
      'Our volunteers served over 1,200 meals to families in need across the district, spreading warmth and hope one plate at a time.',
    location: 'Downtown Community Park',
    attendees: '1,200+',
  },
  {
    id: 'default-2',
    images: [event2],
    date: 'April 22, 2025',
    category: 'Environment',
    title: 'Green Earth Tree Plantation',
    description:
      'In celebration of Earth Day, 300 volunteers came together to plant 2,000 saplings, creating a greener and healthier tomorrow.',
    location: 'City Botanical Garden',
    attendees: '300',
  },
  {
    id: 'default-3',
    images: [event3],
    date: 'May 10, 2025',
    category: 'Education',
    title: 'Open-Air Learning Workshop',
    description:
      'Interactive outdoor learning sessions brought quality education to 500 underprivileged children, igniting curiosity and dreams.',
    location: 'Rural Community Center',
    attendees: '500',
  },
  {
    id: 'default-4',
    images: [event4],
    date: 'June 5, 2025',
    category: 'Healthcare',
    title: 'Free Health Check-Up Camp',
    description:
      'Medical professionals volunteered their time to screen over 800 elderly villagers, providing free consultations and medicines.',
    location: 'Sunrise Village, District 4',
    attendees: '800+',
  },
  {
    id: 'default-5',
    images: [event5],
    date: 'July 20, 2025',
    category: 'Fundraising',
    title: 'Annual Gala Fundraising Dinner',
    description:
      'A spectacular evening of giving, where generous supporters raised over $150,000 to fund our programs for the coming year.',
    location: 'Grand Ballroom, City Hotel',
    attendees: '450',
  },
];

const EVENTS_STORAGE_KEY = 'debipur-events';
export const EVENTS_UPDATED_EVENT = 'debipur-events-updated';

export const loadEvents = () => {
  const storedEvents = window.localStorage.getItem(EVENTS_STORAGE_KEY);
  if (!storedEvents) return defaultEvents;

  try {
    const parsedEvents = JSON.parse(storedEvents);
    return Array.isArray(parsedEvents)
      ? parsedEvents.map((event) => ({
          ...event,
          images: event.images?.length ? event.images : event.image ? [event.image] : [],
        }))
      : defaultEvents;
  } catch {
    return defaultEvents;
  }
};

export const saveEvents = (events) => {
  window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  window.dispatchEvent(new Event(EVENTS_UPDATED_EVENT));
};

export const clearStoredEvents = () => {
  window.localStorage.removeItem(EVENTS_STORAGE_KEY);
  window.dispatchEvent(new Event(EVENTS_UPDATED_EVENT));
};
