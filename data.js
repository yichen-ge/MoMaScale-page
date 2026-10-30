// Motion examples from the supplied supplemental material.
const pageData = [
            {
                dataset: 'HumanML3D',
                description: 'MoMaScale generates high-quality 3D human motions on HumanML3D driven by a wide range of textual inputs. Here, we present {count} examples of synthesized motions demonstrating strong text-motion alignment and high realism.',
                gallery: [
                    {
                        text: 'A person walks in a curve to their right.',
                        src: 'videos/gallery/hml/01/motion.mp4'
                    },
                    {
                        text: 'The figure steps backwards with their right foot and looks back as they sit briefly and then sits back up without using the arms of the chair to get up.',
                        src: 'videos/gallery/hml/02/motion.mp4'
                    },
                    {
                        text: 'A person walks left and right as if they are nervously pacing.',
                        src: 'videos/gallery/hml/03/motion.mp4'
                    },
                    {
                        text: 'The figure walks in a counterclockwise circle, stopping at their starting point.',
                        src: 'videos/gallery/hml/04/motion.mp4'
                    },
                    {
                        text: 'A person slowly walked forward.',
                        src: 'videos/gallery/hml/05/motion.mp4'
                    },
                    {
                        text: 'A person walks forward spins to the left then walk back.',
                        src: 'videos/gallery/hml/06/motion.mp4'
                    },
                    {
                        text: 'A person walks forward, stumbles back, and continues forward.',
                        src: 'videos/gallery/hml/07/motion.mp4'
                    },
                    {
                        text: 'The man kicks with his left foot and then returns to a stable position.',
                        src: 'videos/gallery/hml/08/motion.mp4'
                    },
                    {
                        text: 'Someone waits a moment and jumps to the right.',
                        src: 'videos/gallery/hml/09/motion.mp4'
                    }
                ],
                comparisons: [
                     {
                        prompt: 'The person walks forward with left foot first then stops.',
                        videos: [
                            { method: 'MoMaScale (ours)', src: './videos/comparison/hml/01/momascale.mp4' },
                            { method: 'Momask++ (NeurIPS 2025)', src: './videos/comparison/hml/01/momask++.mp4' },
                            { method: 'MoScale (CVPR 2026)', src: './videos/comparison/hml/01/moscale.mp4' }
                        ]
                    },
                    {
                        prompt: 'A person walks to their right then left then slightly right and stands still.',
                        videos: [
                            { method: 'MoMaScale (ours)', src: './videos/comparison/hml/02/momascale.mp4' },
                            { method: 'Momask++ (NeurIPS 2025)', src: './videos/comparison/hml/02/momask++.mp4' },
                            { method: 'MoScale (CVPR 2026)', src: './videos/comparison/hml/02/moscale.mp4' }
                        ]
                    },
                    {
                        prompt: 'A man raises his right arm up to chest level, then puts it back down.',
                        videos: [
                            { method: 'MoMaScale (ours)', src: './videos/comparison/hml/03/momascale.mp4' },
                            { method: 'Momask++ (NeurIPS 2025)', src: './videos/comparison/hml/03/momask++.mp4' },
                            { method: 'MoScale (CVPR 2026)', src: './videos/comparison/hml/03/moscale.mp4' }
                        ]
                    }
                ]
            },
            {
                dataset: 'SnapMogen',
                description: 'MoMaScale also generalizes to SnapMogen, producing realistic motions for challenging text prompts. Here, we present {count} SnapMogen examples to illustrate motion quality and semantic consistency.',
                gallery: [
                    {
                        text: 'The person stands in a neutral resting position, then raises his hands, and happily dances, waving his hands and hips.',
                        src: 'videos/gallery/snap/01/motion.mp4'
                    },
                    {
                        text: 'The individual stands in a neutral stance before squatting down. They mimic a Tyrannosaurus by bending their arms at the elbows with fingers spread at chest height. The person sways their upper body side to side, roars, and leans forward slightly. Then, they begin walking to their right, maintaining the dinosaur-like posture throughout.',
                        src: 'videos/gallery/snap/02/motion.mp4'
                    },
                    {
                        text: 'The person leans to the left side with the right arm bent at the elbow and raised to head level. Simultaneously, the left arm is bent and positioned downward near the thigh. They then straighten their posture to stand upright.',
                        src: 'videos/gallery/snap/03/motion.mp4'
                    },
                    {
                        text: 'The person is in a neutral resting position. They then shift their body weight from foot to foot.',
                        src: 'videos/gallery/snap/04/motion.mp4'
                    },
                    {
                        text: 'The person leans to the right, placing their left hand on their forehead while the right arm hangs down. Next, they lower their left hand and tilt their body forward slightly, then straighten up to stand tall. They rise onto their toes, stretching their body upward as if searching for something above with their eyes and hands. Finally, they lower their arms and shift their weight, rolling gently from one foot to the other.',
                        src: 'videos/gallery/snap/05/motion.mp4'
                    },
                    {
                        text: 'The person imitates a zombie. They put their arms forward, tilt their body slightly downward, and walk wobbly forward, then wobbly step backward and level off while standing still.',
                        src: 'videos/gallery/snap/06/motion.mp4'
                    },
                    {
                        text: 'The man stands in a neutral stance, facing forward. He then turns his torso to the left side and repeatedly high-fives an unseen partner with his right hand, maintaining a cheerful demeanor throughout the motion.',
                        src: 'videos/gallery/snap/07/motion.mp4'
                    }
                ],
                comparisons: [
                    {
                        prompt: 'The person takes a big step backward and then a few small ones while leveling off on the spot. After that, they stand straight.',
                        videos: [
                            { method: 'MoMaScale (ours)', src: './videos/comparison/snap/01/momascale.mp4' },
                            { method: 'Momask++ (NeurIPS 2025)', src: './videos/comparison/snap/01/momask++.mp4' },
                            { method: 'MoScale (CVPR 2026)', src: './videos/comparison/snap/01/moscale.mp4' }
                        ]
                    },
                    {
                        prompt: 'The person stands in a neutral position, then steps forward with the right foot while turning the torso to the left. They extend the right arm forward, then bend it, raising it to head level before lowering it and turning the body to the right. Finally, they return to the neutral position with a stern expression.',
                        videos: [
                            { method: 'MoMaScale (ours)', src: './videos/comparison/snap/02/momascale.mp4' },
                            { method: 'Momask++ (NeurIPS 2025)', src: './videos/comparison/snap/02/momask++.mp4' },
                            { method: 'MoScale (CVPR 2026)', src: './videos/comparison/snap/02/moscale.mp4' }
                        ]
                    },
                    {
                        prompt: 'The person dances forward in a playful manner, adopting a semi-squat position as they move. With their left side leading, they energetically swing their arms with each step. After moving forward, they transition smoothly to walking backward, maintaining the same semi-squat stance and arm movements.',
                        videos: [
                            { method: 'MoMaScale (ours)', src: './videos/comparison/snap/04/momascale.mp4' },
                            { method: 'Momask++ (NeurIPS 2025)', src: './videos/comparison/snap/04/momask++.mp4' },
                            { method: 'MoScale (CVPR 2026)', src: './videos/comparison/snap/04/moscale.mp4' }
                        ]
                    },
                    {
                        prompt: 'A person stands in a neutral resting position. Then they slightly turns to their left and hugs somebody happily with lowered and raised hands. Finally, the person takes a neutral resting position.',
                        videos: [
                            { method: 'MoMaScale (ours)', src: './videos/comparison/snap/05/momascale.mp4' },
                            { method: 'Momask++ (NeurIPS 2025)', src: './videos/comparison/snap/05/momask++.mp4' },
                            { method: 'MoScale (CVPR 2026)', src: './videos/comparison/snap/05/moscale.mp4' }
                        ]
                    }
                ]
            }
        ];
