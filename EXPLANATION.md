# Time frame (approximate)

* 30-40 mins to understand the README, understand the Figma, explore the codebase, and setup the project with initial tooling.
* 30-40 mins to figure out the router, component compositions, and data-flow with said tooling.
* 20-30 mins to figure out bootstrap and sass for the styling.
* 20-30 mins to pivot to Material UI and tailwind.
* 30-40 mins to add the sort extensible sort feature.
* 30-40 mins to clean things up and documenting.

Total estimated time: 2.5 - 3 hours (+ breaks).

# Why pivot on some tooling?

I chose create-react-app + react-router-dom + bootstrap + sass because they were recommended. I'm a bit rusty with them, but I felt bullish. Turns out, trying to re-learn tools at the same time under time constrain is like re-learning how to ride bikes but with multiple bikes at the same time 🙂 I could push on and am confident I can still get it done, but it was going to take a lot more time.

I pivoted to things I can wield better. I haven't done Material UI in a long time, but I'm familiar with its API and capabilities since I referenced them a lot. For styling, I was using a RN version of tailwind with a different build system so using it straight without the RN abstraction layer should give me a boost.

The react-router-dom got to stay because I felt like moving into file-based routing like NextJS, while nice, won't give me enough boost in speed. Also, looking at how the server endpoint, NextJS might even hurt me a bit.

# Potential improvements

This code is defnitely not prod-ready. If I had more time, I would:

1. Handles loading and error state better. Tools like `react-query` or `apollo` (for GraphQL) helps alot. They also come with bonus with things like caching and deduplication.
2. Change the server endpoint to return a paginated response with a trimmed down participant object (only what's needed by client).
3. Change the server to have `GET /participants/:id` that returns the full participant objects.
4. Move the code name/description lookup to the server for speed and caching.
5. Configure Material UI with our settings for a consistent look with Figma.
6. Think more about responsiveness (e.g. what devices users use, content hierarchy, etc.)
8. If react-router-dom is kept, figure out a way to make it more typesafe.
7. Write tests.

# Closing

Thanks for reading all that. Definitely would love to discuss any questions or concerns that come up.