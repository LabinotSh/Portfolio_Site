const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const ProjectController = require('../controllers/ProjectController')


router.get('/', (req,res) => {
    const data = req.context //{page:..., global:...} the data are stored under the page key

    const projectCtr = new ProjectController()
    projectCtr.get()
    .then(projects => {
        data['projects'] = projects
        console.log('Projects: ' + JSON.stringify(projects))
        res.render('main', data)
    })
    .catch(err => {
        res.send('Oops! ' + err.message)
    })
})

router.get('/project/:slug', (req, res) => {
    const data = req.context
    const projectSlug = req.params.slug

    const projectCtr = new ProjectController()
    projectCtr.get({slug:projectSlug})
    .then(projects => {
        if(projects.length == 0){
            throw new Error('Project not found!')
            return
        }

        const project = projects[0]
        data['project'] = project
        res.render('project', data)
    })
    .catch(err => {
        res.send(err.message)
    })
})

module.exports = router;