import { zodResolver } from '@hookform/resolvers/zod'
import { Add, CloudUpload, Delete } from '@mui/icons-material'
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { LocalStorageRecipeType, UpdateFormRecipeSchema, UpdateFormRecipeType } from '../../schemas/recipe'
import useRecipe from '../../hooks/useRecipe'
import { useState } from 'react'
import { getBase64 } from '../../helper'
import { useNavigate, useParams } from 'react-router-dom'

const ingredientsUnits = [
  { label: 'Kilogram', value: 'Kilogram' },
  { label: 'gram', value: 'gram' },
  { label: 'Tea Spoon', value: 'Tea Spoon' },
]

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const UpdateRecipe = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getRecipeById } = useRecipe()

  const localRecipe: LocalStorageRecipeType | undefined | { image: string } = id
    ? getRecipeById(id)
    : { image: '' }

  const [base64Image, setBase64Image] = useState(() => localRecipe ? localRecipe.image : '')

  const {
    register,
    formState: { errors, isDirty, isSubmitting },
    watch,
    handleSubmit,
    getValues,
    control,
    trigger,
    reset
  } = useForm<UpdateFormRecipeType>({
    defaultValues: localRecipe,
    resolver: zodResolver(UpdateFormRecipeSchema),
  })

  const { fields, append, remove } = useFieldArray<UpdateFormRecipeType>({
    control,
    name: 'ingredients',
  })

  const { updateRecipe } = useRecipe();

  if (!id) {
    return <Typography>Id is required</Typography>
  }

  if (!localRecipe) {
    return <Typography>No Recipe with given Id</Typography>
  }

  const onUpdateRecipe: SubmitHandler<UpdateFormRecipeType> = data => {
    updateRecipe(id, data)
    reset()
    navigate('/')
  }

  return (
    <Box
      component={'main'}
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
      }}>
      <Paper sx={{ p: 3, maxWidth: '500px', width: '100%' }}>
        <Typography component={'h1'} fontWeight='bold' variant='h5' gutterBottom>
          Update Recipe
        </Typography>
        <Stack component={'form'} onSubmit={handleSubmit(onUpdateRecipe)} noValidate autoComplete='off' spacing={2}>
          <TextField
            label='Recipe Title'
            size='small'
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label='Recipe Details'
            size='small'
            rows={3}
            maxRows={4}
            {...register('detail')}
            error={!!errors.detail}
            helperText={errors.detail?.message}
          />
          <Box>
            <Button
              component='label'
              variant='outlined'
              color={errors.image ? 'error' : 'primary'}
              fullWidth
              startIcon={<CloudUpload />}>
              Upload Recipe Image
              <Controller
                name='image'
                control={control}
                render={({ field: { ref, name, onBlur, onChange } }) => (
                  <VisuallyHiddenInput
                    type='file'
                    ref={ref}
                    name={name}
                    onBlur={onBlur}
                    onChange={e => {
                      onChange(e.target.files?.[0])
                      trigger('image')
                      getBase64(getValues('image') as File, result => {
                        setBase64Image(result as string)
                      })
                    }}
                  />
                )}
              />
            </Button>
            {errors.image ? <FormHelperText sx={{ color: '#d32f2f' }}>{errors.image.message}</FormHelperText> : null}
            {
              // If base64 image is there and non empty then show the image and if error then don't show
              base64Image && !errors.image ? (
                <Box sx={{ width: '100%', mt: 1, mb: 1 }}>
                  <img
                    src={base64Image}
                    style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '5px' }}
                  />
                </Box>
              ) : null
            }
          </Box>
          <Stack direction='row' spacing={2}>
            <TextField
              label='Prep Duration'
              size='small'
              type='number'
              {...register('prepDuration', { valueAsNumber: true })}
              error={!!errors.prepDuration}
              helperText={errors.prepDuration?.message}
              InputProps={{
                endAdornment: <InputAdornment position='end'>hour</InputAdornment>,
              }}
            />
            <TextField
              label='Cook Duration'
              size='small'
              type='number'
              {...register('cookDuration', { valueAsNumber: true })}
              error={!!errors.cookDuration}
              helperText={errors.cookDuration?.message}
              InputProps={{
                endAdornment: <InputAdornment position='end'>hour</InputAdornment>,
              }}
            />
          </Stack>
          <Typography>
            <Button
              endIcon={<Add />}
              variant='outlined'
              onClick={() => append({ name: '', quantity: 0, unit: 'gram' })}>
              Add Ingredients
            </Button>
          </Typography>
          {fields.map((field, index) => (
            <Stack key={field.id} spacing={2} direction='row'>
              <TextField
                label='Name'
                size='small'
                {...register(`ingredients.${index}.name`)}
                error={errors.ingredients && errors.ingredients[index]?.name ? true : false}
                helperText={
                  errors.ingredients && errors.ingredients[index] ? errors.ingredients[index]?.name?.message : null
                }
              />
              <TextField
                select
                label='Unit'
                defaultValue='gram'
                size='small'
                {...register(`ingredients.${index}.unit`)}
                error={errors.ingredients && errors.ingredients[index]?.unit ? true : false}
                helperText={
                  errors.ingredients && errors.ingredients[index] ? errors.ingredients[index]?.unit?.message : null
                }>
                {ingredientsUnits.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label='Quantity'
                type='number'
                size='small'
                {...register(`ingredients.${index}.quantity`, { valueAsNumber: true })}
                error={errors.ingredients && errors.ingredients[index]?.quantity ? true : false}
                helperText={
                  errors.ingredients && errors.ingredients[index] ? errors.ingredients[index]?.quantity?.message : null
                }
                InputProps={{
                  endAdornment: <InputAdornment position='end'>{watch(`ingredients.${index}.unit`)}</InputAdornment>,
                }}
              />
              {fields.length > 1 ? (
                <IconButton aria-label='delete' onClick={() => remove(index)}>
                  <Delete />
                </IconButton>
              ) : null}
            </Stack>
          ))}

          <Button type='submit' disabled={isSubmitting || !isDirty} variant='contained'>
            Update Recipe
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default UpdateRecipe
