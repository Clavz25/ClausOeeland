# Portfolio Hub

Claus Øeland's personal portfolio: a Hub that routes visitors to three
independently deployed Showcases, one per discipline. Its audience is
hiring managers and recruiters for senior marketing data-driven
strategist roles.

## Language

**Hub**:
The entry point at the root domain. A single page whose job is to route
a visitor to one of the three Showcases. Lives in this repository.
_Avoid_: Landing page, portfolio site, home page

**Showcase**:
One discipline area — Design/Development, Marketing, or Analytics —
built and deployed independently of the Hub and of each other.
_Avoid_: Site, sub-site, section, page

**Case Study**:
One piece of work presented inside a Showcase. PAXINOX is a Case Study;
it is not a Showcase.
_Avoid_: Project, portfolio piece, work sample

**Card**:
The Hub's representation of a single Showcase. Expands on hover and
navigates to that Showcase's deployment when clicked.
_Avoid_: Tile, panel, link

**Coming Soon Card**:
A Card for a Showcase that has no deployment yet. Present on the Hub
from day one so all three disciplines are visible.
