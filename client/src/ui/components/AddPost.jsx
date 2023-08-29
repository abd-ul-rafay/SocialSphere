import { useState } from 'react';
import axiosInstance from "../../api";
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { BiImageAdd, BiSearch, BiVideo } from 'react-icons/bi';
import { addPostToList } from '../../state/slices/postsSlice';

const AddPost = () => {
    const [addImage, setAddImage] = useState(false);
    const [addSearchTag, setAddSearchTag] = useState(false);
    const [image, setImage] = useState(null);
    const [descText, setDescText] = useState('');
    const [tagText, setTagText] = useState('');
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    const handleOnPostClick = () => {
        if (!descText) {
            return;
        }

        addPost(descText, tagText, image, token);
        setDescText('');
        setTagText('');
        setAddImage(false);
        setAddSearchTag(false);
        setImage(null);
    }

    const addPost = async (desc, searchTags, image, token) => {
        const formData = new FormData();

        formData.append('desc', desc);
        formData.append('searchTags', searchTags);
        formData.append('image', image);

        try {
            const response = await axiosInstance.post('/api/v1/posts', formData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            dispatch(addPostToList(response.data));
        } catch (err) {
            alert(err?.response?.data?.err || 'Something went wrong');
        }
    }

    return (
        <section className="widget add-post-container">
            <input type="text" name="desc" placeholder="What is in your mind?" value={descText} onChange={(e) => setDescText(e.target.value)} />
            {addSearchTag && <input
                style={{ marginTop: '0.5rem' }}
                type="text"
                name="searchTags"
                placeholder="Add search tags"
                value={tagText}
                onChange={(e) => setTagText(e.target.value)}
            />}
            {addImage && <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                    setImage(acceptedFiles[0])
                }
            >
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div className='dropzone-container' {...getRootProps()}>
                            <input {...getInputProps()} />
                            {!image ? (
                                <p className='small-text' style={{ color: 'var(--grey-400)' }}>Add your image here</p>
                            ) : (
                                <p className='small-text'>{image.name}</p>
                            )}
                        </div>
                    </section>
                )}
            </Dropzone>}
            <div className="buttons-row">
                <div className='post-button' onClick={() => setAddImage(state => !state)}>
                    <BiImageAdd className='icon' />
                    <p className='small-text'>Image</p>
                </div>
                <div className='post-button' onClick={() => setAddSearchTag(state => !state)}>
                    <BiSearch className='icon' />
                    <p className='small-text'>Search Tags</p>
                </div>
                <div className='post-button'>
                    <BiVideo className='icon' />
                    <p className='small-text'>Clip</p>
                </div>
                <p className='small-text add-post-button' onClick={handleOnPostClick}>Post</p>
            </div>
        </section>
    )
}

export default AddPost
