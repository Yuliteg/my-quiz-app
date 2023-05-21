using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QuizServer.Models;

namespace QuizServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public QuestionController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Question
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestion()
        {
            var random10q = await (_context.Questions
                .Select(x => new {
                    QnId = x.QnId,
                    QnInWordps = x.QnInWordps,
                    ImageUrl = x.ImageUrl,
                    Options = new string[] {x.Option1, x.Option2, x.Option3, x.Option4 }
                })
                .OrderBy(y => Guid.NewGuid())
                .Take(10)
                ).ToListAsync();
            return Ok(random10q);
        }

        //POST: api/Question/GetAnswers
        [HttpPost]
        [Route("GetAnswers")]
        public async Task<ActionResult<Question>> RetrieveAnswers(int[] qnIds)
        {
            var answers = await (_context.Questions
                    .Where(x => qnIds.Contains(x.QnId))
                    .Select(y => new
                    {
                        QnId = y.QnId,
                        QnInWordps = y.QnInWordps,
                        ImageUrl = y.ImageUrl,
                        Options = new string[] { y.Option1, y.Option2, y.Option3, y.Option4 }, // Add comma here
                        Answer = y.Answer
                    })).ToListAsync();


            return Ok(answers);
        }


        private bool QuestionExists(int id)
        {
          return (_context.Questions?.Any(e => e.QnId == id)).GetValueOrDefault();
        }
    }
}
