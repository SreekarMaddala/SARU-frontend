# TODO: Restructure Analytics into 4 Pages

## New Structure
- **AnalyticsPage.jsx**: Main summary page with overview and links to 3 sub-pages
- **SentimentTopicsPage.jsx**: Sentiment analysis and topic modeling
- **ChannelUserPage.jsx**: Channel analysis and user behavior
- **PerformanceAdvancedPage.jsx**: Company performance, product analysis, temporal, and correlation

## Steps to Complete

1. **Modify AnalyticsPage.jsx**
   - Change to summary page with high-level overview
   - Add navigation links to the 3 sub-pages
   - Fetch summary data (e.g., total feedback, avg sentiment)

2. **Create SentimentTopicsPage.jsx**
   - Handle /analytics/sentiment and /analytics/topics
   - Display detailed sentiment and topic data

3. **Create ChannelUserPage.jsx**
   - Handle /analytics/channels and /analytics/users
   - Display channel and user analytics

4. **Create PerformanceAdvancedPage.jsx**
   - Handle /analytics/company_performance, /analytics/products, /analytics/temporal, /analytics/correlation
   - Display performance and advanced analytics

5. **Update App.jsx**
   - Add protected routes for the 3 new pages

6. **Test the Implementation**
   - Ensure all pages load correctly
   - Verify navigation works
   - Check responsiveness and styling

## Notes
- Use the existing auth context for token-based API calls
- Follow the project's styling conventions (Tailwind with custom saru colors)
- Ensure all pages are protected and require authentication

## Completed Steps
- [x] Create initial AnalyticsPage.jsx
- [x] Add Route in App.jsx for /analytics
- [x] Update DashboardPage.jsx Navigation
- [x] Modify AnalyticsPage to summary
- [x] Create SentimentTopicsPage
- [x] Create ChannelUserPage
- [x] Create PerformanceAdvancedPage
- [x] Update App.jsx with new routes
- [ ] Test the Implementation
