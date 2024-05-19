const Job = require('../models/Job');

module.exports = {
    createJob: async (req, res) => {
        const newJob = new Job(req.body);

        try{
            const saveJob = await newJob.save();
            const { __v, createdAt, updatedAt, ...others } = saveJob._doc;

            res.status(200).json({...others});
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    updateJob: async (req, res) => {
        try{
            const updateJob = await Job.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            );

            // Check if updateJob is not null or undefined
            if (!updateJob) {
                return res.status(404).json({ message: "Job not found" });
            }

            const { __v, createdAt, updatedAt, ...others } = updateJob._doc;

            res.status(200).json({...others});

        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    deleteJob: async (req, res) => {

        try{
            const deleteJob = await Job.findByIdAndDelete(req.params.id);

            // Check if deleteJob is not null or undefined
            if (!deleteJob) {
                return res.status(404).json({ message: "Job not found" });
            }

            const { __v, createdAt, updatedAt, ...others } = deleteJob._doc;

            res.status(200).json({message: "Job has been deleted"});
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    getJob: async (req, res) => {
        try{
            const getJob = await Job.findById(req.params.id);
            // Check if getJob is not null or undefined
            if (!getJob) {
                return res.status(404).json({ message: "Job not found" });
            }

            // console.log(getJob);
            const { __v, createdAt, updatedAt, ...others } = getJob._doc;

            res.status(200).json({...others});
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    getAllJobs: async (req, res) => {
        try{
            const getAllJob = await Job.find();
            // console.log(getAllJob);
            res.status(200).json({getAllJob});
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    searchJobs: async (req, res) => {
        try{
            const getSearchJob = await Job.aggregate(
                [
                    {
                      $search: {
                        index: "jobsearch",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            );

            res.status(200).json({getSearchJob});
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
}