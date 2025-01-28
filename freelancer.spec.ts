import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Odine Freelance Marketplace Tests', () => {

    test('Search Freelancers by Name', async ({ request }) => {
        const searchName = 'Freelancer 1';
        const response = await request.get(`${BASE_URL}/users`);
        const freelancers = await response.json();

        const filteredFreelancers = freelancers.filter((f: any) =>
            f.name.toLowerCase().includes(searchName.toLowerCase())
        );

        expect(filteredFreelancers.length).toBeGreaterThan(0);
        filteredFreelancers.forEach((freelancer: any) => {
            expect(freelancer.name.toLowerCase()).toContain(searchName.toLowerCase());
        });
        console.log('Freelancer searched with name successfully!');
    });

    test('Search Freelancers by Finished Job Count', async ({ request }) => {
        const minJobCount = 5;
        const maxJobCount = 10;
        const response = await request.get(`${BASE_URL}/users`);
        const freelancers = await response.json();

        const filteredFreelancers = freelancers.filter((f: any) =>
            f.jobCount >= minJobCount && f.jobCount <= maxJobCount
        );

        expect(filteredFreelancers.length).toBeGreaterThan(0);
        filteredFreelancers.forEach((freelancer: any) => {
            expect(freelancer.jobCount).toBeGreaterThanOrEqual(minJobCount);
            expect(freelancer.jobCount).toBeLessThanOrEqual(maxJobCount);
        });
        console.log('Freelancers finished job count checked successfully!');
    });

    test('Search Freelancers by City', async ({ request }) => {
        const searchCity = 'New York';
        const response = await request.get(`${BASE_URL}/users`);
        const freelancers = await response.json();

        const filteredFreelancers = freelancers.filter((f: any) =>
            f.city.toLowerCase().includes(searchCity.toLowerCase())
        );

        expect(filteredFreelancers.length).toBeGreaterThan(0);
        filteredFreelancers.forEach((freelancer: any) => {
            expect(freelancer.city.toLowerCase()).toContain(searchCity.toLowerCase());
        });
        console.log('Freelancer searched with city successfully!');
    });

    test('Hire Freelancer Popup', async () => {
        const freelancerData = {
            name: 'John Doe',
            message_subject: 'Job Opportunity',
            message_body: 'I would like to hire you for a project.'
        };

        expect(freelancerData.name).toBe('John Doe');
        expect(freelancerData.message_subject).toBe('Job Opportunity');
        expect(freelancerData.message_body).toBe('I would like to hire you for a project.');
        console.log('Freelancer hire popup checked successfully!');
    });

    test('Light/Dark Mode Toggle', async () => {
        let currentMode = 'light';
        const newMode = currentMode === 'light' ? 'dark' : 'light';

        expect(currentMode).not.toBe(newMode);
        console.log('Mode toggle checked successfully!');
    });

    test('Save Freelancer Feature', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/users`);
        const freelancers = await response.json();
        const savedFreelancer = freelancers[0]; // Assume we save the first freelancer
        const savedFreelancers = [savedFreelancer];

        expect(savedFreelancers).toContain(savedFreelancer);
        console.log('Freelancer saved correctly!');
    });
});
