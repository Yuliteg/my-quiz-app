#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizServer.Models;

namespace QuizServer.Controllers
{
  [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public ParticipantController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: Participant
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Participant>>> GetParticipants()
        {
            return await _context.Participants.ToListAsync();
        }


        // GET: Participant/Details/5


        // GET: Participant/Create


        // POST: Participant/Post

        [HttpPost]

        public async Task<ActionResult<Participant>> PostParticipant(Participant participant)
        {
            var temp = _context.Participants
                .Where(x => x.Name == participant.Name
                && x.Email == participant.Email)
                .FirstOrDefault();

            if (temp == null)
            {
                _context.Participants.Add(participant);
                await _context.SaveChangesAsync();
            }
            else
                participant = temp;

            return Ok(participant);
        }

        // GET: Participant/Edit/5



        // POST: Participant/Delete/5

        //PUT: api/Participant/10 ...
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParticapant(int id, ParticipantResult _participantResult)
        {
            if (id != _participantResult.ParticipantId)
            {
                return BadRequest();
            }

            if (_participantResult == null)
            {
                return BadRequest();
            }

            Participant participant = _context.Participants.Find(id);
            participant.Score = _participantResult.Score;
            participant.TimeTaken = _participantResult.TimeTaken;


            _context.Entry(participant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParticipantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool ParticipantExists(int id)
        {
            return _context.Participants.Any(e => e.ParticipantId == id);
        }
    }
}
