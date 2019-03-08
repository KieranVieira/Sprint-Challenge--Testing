describe('Server.js', () => {
    it('Server should be running in testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
});