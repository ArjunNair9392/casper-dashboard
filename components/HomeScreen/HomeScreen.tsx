// import styles from './Homescreen2.module.scss';
import GoogleConnect from '../SocialMediaConnectors/GoogleConnect/GoogleConnect';
import OneDriveConnect from '../SocialMediaConnectors/OneDriveConnect/OneDriveConnect';
import SharePointConnect from '../SocialMediaConnectors/SharePointConnect/SharePoint';
import IconDroplet from '@/components/Icon/IconDroplet';
import Card from '@/components/Card/Card';

function formatDate(date: Date) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    return `${monthName}, ${day}`;
}

const HomeScreen = () => {
    const companyName = 'Amazon'; //REPLACE WITH COMPANY FROM API

    return (
        <div className={"styles.homeScreenContainer"}>
            {/* <div className={"styles.header"}>
                <p>{user ? user.name : 'CasperAI'} | {companyName} </p>
                < className={"styles.time}>{formatDate(new Date())}</"p>
            </div> */}
            <div className={"styles.dashboardContainer"}>
                <div className={"`${styles.projectBoxes} ${styles.jsGridView}`"}>
                    {/* First row */}
                    <Card>
                        <div className="py-7 px-6">
                            <div className="mb-5 inline-block rounded-full bg-[#3b3f5c] p-3 text-[#f1f2f3]">
                                <IconDroplet />
                            </div>
                            <h5 className="mb-4 text-xl font-semibold text-[#3b3f5c] dark:text-white-light">Simple</h5>
                            <p className="text-white-dark">Mauris nisi felis, placerat in volutpat id, varius et sapien.</p>
                        </div>
                    </Card>
                    <Card >
                        <iframe
                            src='https://www.youtube.com/embed/2IK3DFHRFfw?si=QD_gNv17rOdl5pyH'
                            allow='autoplay; encrypted-media'
                            title='video'
                            height="200"
                            width="100%"
                        />
                    </Card>
                    <Card>
                        <p><button className={"styles.chatButton"}>Chat with Casper</button></p>
                    </Card>

                </div>
                <div className={"`${styles.projectBoxes} ${styles.jsGridView} ${styles.socialMediaContainer}`"}>
                    <Card >
                        <div className={"styles.projectBoxHeader"}>
                            <div className={"styles.boxContentHeader"}>Connect your accounts</div>
                            <div className={"`${styles.boxContentSubheader} ${styles.loginIcons}`"}>
                                <GoogleConnect />
                                <OneDriveConnect />
                                <SharePointConnect />
                            </div>
                        </div>
                    </Card>
                    {/* <Card>
                        <div className={"styles.projectBoxHeader"}>
                            < className={"styles.boxContentHeader}>Getting started</"p>
                            <p className={"styles.boxContentSubheader"}>
                                <strong>Step 1: Connect Your Account</strong><br></br>
                                1. Click on the "Connect Your Account" Button: Look for the button labeled "Connect Your Account" and click on it.<br></br>
                                2. Follow the Authentication Steps: You will be redirected to a Google authentication page where you'll need to log in to your Google account if you're not already logged in.<br></br>
                                3. Authorize Access: After logging in, you'll see a prompt asking for permission to access your Google Drive files. Click "Allow" to grant access.<br></br>
                                <strong>Step 2: Add the Files from the Connected Drive</strong><br></br>
                                1. Navigate to Your Google Drive: Open your Google Drive in a new browser tab or window.<br></br>
                                2. Locate the Desired Files: Find the files you want to add to the application. These could be documents, images, or any other type of file stored in your Google Drive.<br></br>
                                3. Select the Files: Click on the files you want to add to select them. You can select multiple files by holding down the Ctrl key (or Command key on Mac) while clicking.<br></br>
                                4. Copy or Move the Files: Right-click on the selected files and choose the option to copy or move them. Alternatively, you can use keyboard shortcuts or drag-and-drop to copy or move the files.<br></br>

                                <strong>Step 3: Link the Files</strong><br></br>
                                1. Return to the Application: Switch back to the browser tab or window where the application is open.<br></br>
                                2. Access the Linking Page: Look for a link or button within the application interface labeled "Link the Files" and click on it.<br></br>
                                3. Follow the Linking Process: You will be guided through a linking process where you'll need to specify the location or path of the files you added from Google Drive.
                                4. Confirm the Linking: Review the details of the files you linked and confirm the linking process.<br></br>

                                <strong>Step 4: Chat Away</strong><br></br>
                                1. Start a Conversation: With your account connected and files linked, you are now ready to start chatting. Look for chat options or features within the application interface.<br></br>
                                2. Engage with Others: Initiate conversations with other users who have access to the same files or collaborate on projects by sharing thoughts, ideas, and feedback.<br></br>
                                3. Explore Additional Features: Take advantage of any additional features or functionalities offered by the chat application to enhance your communication experience.<br></br>
                            </p>
                        </div>
                    </Card> */}
                </div>
                <div className={"`${styles.projectBoxes} ${styles.jsGridView} ${styles.blogContainer}`"}>
                    <Card >
                        <div className={"styles.projectBoxHeader"}>
                            <p className={"styles.boxContentHeader"}>Blog</p>
                            <p className={"styles.boxContentSubheader"}>The future of generative AI is both exciting and uncertain. As the technology advances, it will continue to transform how we create and interact with digital content. Collaboration between AI and human creativity is likely to become more seamless, opening up new avenues for innovation and expression.

                                To harness the full potential of generative AI, it is essential to navigate the ethical and societal implications carefully. By doing so, we can ensure that this powerful technology contributes positively to our world, fostering creativity, innovation, and progress across various fields.</p>
                        </div>
                    </Card>
                    <Card >
                        <div className={"styles.projectBoxHeader"}>
                            <div className={"styles.boxContentHeader"}>Blog</div>
                            <div className={"styles.boxContentSubheader"}>
                                <p className="font-semibold mb-2">What is Generative AI?</p>
                                At its core, generative AI uses complex algorithms and models, such as Generative Adversarial Networks (GANs) and Variational Autoencoders (VAEs), to create new data. These models are trained on vast datasets and learn to understand and replicate the patterns within the data. Once trained, they can generate new, unique pieces of content that follow the learned patterns.</div>
                        </div>
                    </Card>
                </div>
                <div className={"`${styles.projectBoxes} ${styles.jsGridView} ${styles.blogContainer}`"}>
                    <Card >
                        <div className={"styles.projectBoxHeader"}>
                            <div className={"styles.boxContentHeader"}>Frequently asked questions</div>
                            <div className={"styles.boxContentSubheader"}>
                                <p className="font-semibold mb-2">1. What is document parsing using AI?</p>
                                <p>Document parsing using AI refers to the process of automatically extracting and analyzing information from documents such as text files, PDFs, or images using artificial intelligence algorithms.</p>
                                <p className="font-semibold mt-4 mb-2">2. What are the benefits of using AI for document parsing?</p>
                                <p>- AI-driven document parsing streamlines the extraction of key information from large volumes of documents, saving time and reducing manual effort.</p>
                                <p>- It improves accuracy by minimizing human error and ensuring consistent data extraction across various document formats.</p>
                                <p>- AI algorithms can handle complex document structures and languages, making them versatile for diverse use cases.</p>
                                <p>- Document parsing with AI enables faster decision-making by providing quick access to relevant information stored within documents.</p>
                                <p>- It enhances compliance and regulatory adherence by automating data extraction and ensuring data integrity.</p></div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
